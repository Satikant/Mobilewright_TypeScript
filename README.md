# Mobilewright_TypeScript

## 📱 Mobile Execution Guide

This project configuration is managed dynamically through `mobilewright.config.ts`. A single test script can be executed on both Android and iOS by using the appropriate `--project` flag.

---

## 🍏 iOS Execution

To execute a test script on an iOS device or simulator:

```bash
npx mobilewright test 'webdriverio.spec.ts' --project=ios
```

> ⚠️ **Note:** The `.app` file must be compressed into a `.zip` file before execution.

### Why `--project=ios`?

The repository contains multiple platform configurations. The `--project=ios` flag ensures that the test is executed using the **iOS-specific configuration**.

---

## 🤖 Android Execution

To execute a test script on an Android device or emulator:

```bash
npx mobilewright test 'webdriverio.spec.ts' --project=android
```

### Why `--project=android`?

The `--project=android` flag ensures that the test is executed using the **Android-specific configuration**.

---

# ⚙️ Prerequisites & Setup

## 1. Configure the Bundle ID / Package Name

Before executing the test script, update the `bundleId` in `mobilewright.config.ts` according to the target platform.

### iOS

```ts
bundleId: 'org.wdiodemoapp',
```

### Android

```ts
bundleId: 'com.wdiodemoapp',
```

> **Note:** If Android and iOS use different Bundle IDs/Package Names, configure the `bundleId` inside each platform's project configuration.  
> If the same `bundleId` is applicable to both projects, it can be configured globally.

---

## 2. Application Resources

The required application binaries are located in the `testAppResources` folder.

| Platform | Application |
|---|---|
| Android | `webdriver.io.apk` |
| iOS | `wdiodemoapp.zip` |

> ⚠️ **iOS Note:** The `.app` file must remain compressed in `.zip` format before execution.

---

# 🚀 Mobilewright Parallel Execution Configuration

To execute Android and iOS tests in parallel, configure the Mobilewright projects appropriately.

## 1. Configure Bundle ID Per Platform

If Android and iOS applications have **different Bundle IDs**, configure the `bundleId` inside the respective platform configuration.

```ts
projects: [
  {
    name: 'ios',
    use: {
      platform: 'ios',
      bundleId: 'com.example.ios',
    },
  },
  {
    name: 'android',
    use: {
      platform: 'android',
      bundleId: 'com.example.android',
    },
  },
]
```

If the **same Bundle ID is used for both applications**, the `bundleId` can be configured globally.

---

## 2. Enable Fully Parallel Execution

To enable parallel execution, set:

```ts
fullyParallel: true
```

---

## 3. Configure Minimum Two Workers

Since Android and iOS execution will run simultaneously, configure at least **2 workers**:

```ts
workers: 2
```

This allows Mobilewright to execute the Android and iOS projects concurrently when the required devices/simulators are available.

---

## Recommended Configuration

```ts
import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,

  workers: 2,
  fullyParallel: true,

  projects: [
    {
      name: 'ios',
      use: {
        platform: 'ios',
        bundleId: 'com.example.ios',
        installApps: 'ios/MyApp.zip',
      },
    },
    {
      name: 'android',
      use: {
        platform: 'android',
        bundleId: 'com.example.android',
        installApps: '/path/to/Android.apk',
      },
    },
  ],

  autoAppLaunch: true,
  reporter: 'html',
});
```

---

# ▶️ Test Execution

## Execute Tests on Both Android and iOS

To execute all test files on both configured platforms:

```bash
npx mobilewright test
```

## Execute a Specific Test File on Both Platforms as parallel execution

To execute `webdriverio.spec.ts` on both Android and iOS:

```bash
npx mobilewright test 'webdriverio.spec.ts'
```

With `workers: 2` and `fullyParallel: true`, the configured projects can execute in parallel when both platforms are available.

## Execute Only Android

```bash
npx mobilewright test 'webdriverio.spec.ts' --project=android
```

## Execute Only iOS

```bash
npx mobilewright test 'webdriverio.spec.ts' --project=ios
```

---

# ⚠️ Important

For parallel Android and iOS execution, make sure the following are available and ready before starting the test execution:

- Android device/emulator
- iOS device/simulator
- Correct application binary for each platform
- Correct `bundleId` for each platform
- At least `2` workers configured

### Quick Reference

| Requirement | Configuration |
|---|---|
| Android project | `name: 'android'` |
| iOS project | `name: 'ios'` |
| Parallel execution | `fullyParallel: true` |
| Minimum workers | `workers: 2` |
| Both platforms | `npx mobilewright test` |
| Android only | `--project=android` |
| iOS only | `--project=ios` |