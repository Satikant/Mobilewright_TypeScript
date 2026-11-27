import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests', //OR: '.',
  // IMPORTANT: the test timeout must be LARGER than installTimeout + appLaunchTimeout.
  // Otherwise a slow APK install is reported as the useless
  // "Test timeout of Nms exceeded while setting up device" and the real error is hidden.
  timeout: 240000,
  retries: 1,
  viewTree:'on-failure',
  //bundleId:'org.wdiodemoapp' || 'com.wdiodemoapp',
  workers:1, //Set more than 1 worker for Parallel execution
  // Store test artifacts
  outputDir: './test-results',
  projects:[
      {
      name: 'ios',
      use: {
        platform: 'ios',
        bundleId:'org.wdiodemoapp',
        installApps: './testapps/iosWdioapp.zip',
        deviceName:/iPhone 18 Pro/,
      },
    },
    {
      name: 'android',
      use: {
        platform: 'android',
        bundleId:'com.wdiodemoapp',
        installApps:'./testapps/AndroidWdio.apk',
        // FIX: use /.*/ instead of /Pixel 10 Pro/.
        // Mobilewright 0.0.51 has a bug: if no device matches deviceName it does NOT
        // throw and does NOT time out - it re-queues the allocation forever, and the only
        // symptom is "Test timeout of Nms exceeded while setting up device" with no cause.
        // CI runs exactly one emulator, so matching any device is both correct and safe.
        // (If you ever run several devices, use deviceId:'Pixel_10_Pro' instead.)
        deviceName:/.*/,
        installTimeout:150000,  // 124 MB APK on a cold emulator is slow
        appLaunchTimeout: 60000
      },
    },
  ],
  autoAppLaunch:true,
  fullyParallel:true, //true for parallel execution
  reporter: [
    ['list'],
    // Emit straight into mobilewright-report/ so the CI artifact path is correct
    // without needing "--reporter html" on the command line (the CLI flag overrides
    // every reporter in this file, which would skip allure-playwright entirely).
    ['html', { outputFolder: 'mobilewright-report', open: 'never' }],
    [
        'allure-playwright',
        {
            resultsDir: 'allure-results',
            environmentInfo: {
                Framework: 'Mobilewright',
                FrameworkVersion: '0.0.51',
                Application: 'WDIO Demo App',
                Platforms: 'Android and iOS',
            },
        },
    ],
],
});
