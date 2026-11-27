#!/usr/bin/env bash
#
# Runs the Mobilewright Android suite on an already-booted emulator.
#
# WHY THIS IS A FILE AND NOT AN INLINE `script:` BLOCK
# ----------------------------------------------------
# reactivecircus/android-emulator-runner does NOT run `script:` as one shell.
# parseScript() splits the input on every newline and executes each line with a
# separate `sh -c`. Consequences:
#   * variables do NOT survive from one line to the next
#   * `set -e` / `set -x` apply only to the single line they appear on
#   * a `\` line-continuation is torn apart
# Keeping the logic in one real script avoids all of that.
#
# WHY THE GUARDS
# --------------
# Mobilewright 0.0.51 hangs forever when no connected device matches
# `deviceName`: mobilecli-allocator throws NoDeviceAvailableError, and
# DevicePool.startAllocationForWaiter re-queues the waiter without rejecting it.
# As no slot is ever freed, pump() is never called again and allocationTimeoutMs
# (600000) never fires. The only symptom is Playwright's
#   "Test timeout of Nms exceeded while setting up device"
# with no underlying cause, wasting the full job budget. These guards surface a
# clear message in seconds instead.

set -euo pipefail

echo "── Environment ──────────────────────────────────────────────"
echo "ANDROID_HOME=${ANDROID_HOME:-<unset>}"
echo "ANDROID_SERIAL=${ANDROID_SERIAL:-<unset>}"
command -v adb
command -v node && node -v
command -v npx

echo "── Connected devices ────────────────────────────────────────"
adb devices -l

# Take the first device in state "device". DEVICE_MAX=1 makes adb exit 1 after
# listing it (SIGPIPE), which is expected, so the pipeline status is neutralised.
DEVICE="$(adb devices | awk '$2=="device"{print $1; exit}' || true)"
echo "RESOLVED_DEVICE=[${DEVICE}]"

if [ -z "${DEVICE}" ]; then
  echo "::error::No Android device in state 'device'. The emulator is not visible to adb."
  exit 1
fi

echo "── Device identity (what Mobilewright matches deviceName against) ──"
# mobilecli derives an emulator's name from ro.boot.qemu.avd_name with
# underscores replaced by spaces; otherwise it falls back to ro.product.model.
adb -s "${DEVICE}" shell getprop ro.boot.qemu.avd_name || true
adb -s "${DEVICE}" shell getprop ro.product.model || true

echo "── Pre-install the mobilecli agent (hard-capped) ─────────────"
# The driver calls execFileSync() with NO timeout, so a stalled agent install
# blocks fixture setup silently forever. This is the only place a cap can be
# enforced. On a cold emulator the first install is the slowest step.
if ! timeout 480 npx mobilewright install; then
  echo "::error::mobilecli agent install failed or exceeded 480s. Run 'npx mobilewright doctor' for details."
  exit 1
fi

echo "── Devices as seen by Mobilewright ──────────────────────────"
# Prints the name Mobilewright will match against deviceName.
npx mobilewright devices || true

echo "── Running tests ────────────────────────────────────────────"
# No --reporter flag: the CLI's --reporter OVERRIDES every reporter in
# mobilewright.config.ts, which would drop allure-playwright's resultsDir and the
# html outputFolder. The config already declares list + html + allure-playwright,
# so plain 'test' gives the per-test pass/fail lines in the log AND keeps both
# report outputs in their expected directories.
export DEBUG='mw:*'
npx mobilewright test tests/wdioE2ETest.spec.ts --project=android
