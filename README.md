# Mobilewright_TypeScript
📱 Mobile Execution Guide
This project configurations are managed dynamically via mobilewright.config.ts. You can run a single test script across both Android and iOS platforms simply by changing the --project flag.
🍏 iOS Execution
To execute your test script on an iOS device, use the command below.
⚠️ Note: The .app file must be compressed into a ZIP format before execution.
bash
npx mobilewright test 'webdriverio.spec.ts' --project=ios
• Why --project ios? Because the repository contains multiple test configurations, this specific flag isolates and executes only the iOS-targeted test cases.

🤖 Android Execution
To execute your test script on an Android device, use the following command:
bash
npx mobilewright test 'webdriverio.spec.ts' --project=android
Use code with caution.
• Why --project android? Similar to iOS, this specific flag isolates and executes only the Android-targeted test cases out of our multiple test suites.

Prerequisites & Setup
1. Configure the Bundle ID / Package Name
Before executing any script, you must update the bundle identifier in mobilewright.config.ts to match your target environment:

typescript
// iOS - Update the BundleID
bundleId: 'org.wdiodemoapp', 

// Android - Update the PackageName
bundleId: 'com.wdiodemoapp', 

2. Application Resources
The required application binaries are located in the testAppResources folder. Ensure you point to the correct file:
• Android: webdriver.io.apk
• iOS: wdiodemoapp.zip (Note: The .app file must remain compressed in this ZIP format)

## Mobilewright Parallel Execution Configuration

When configuring Mobilewright for Android and iOS parallel execution, follow the below guidelines.

### 1. Configure Bundle ID Per Platform

If the Android and iOS applications have **different Bundle IDs**, configure the `bundleId` inside the respective platform/project configuration.

If the **same Bundle ID is used for both Android and iOS applications**, the `bundleId` can be configured globally.

### 2. Enable Fully Parallel Execution

To allow tests to execute in parallel across the configured projects, set:

```ts
fullyParallel: true
```

### 3. Configure Minimum Two Workers

Since Android and iOS execution will happen simultaneously, configure at least **2 workers**:

```ts
workers: 2
```

This allows Mobilewright to run one worker for Android and another worker for iOS.

### Recommended Configuration

```ts
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

### Execution

To execute the test on both Android and iOS projects:

```bash
npx mobilewright test
```

To execute a specific test file on both platform in paralle:

```bash
npx mobilewright test 'webdriverio.spec.ts'
```

To execute only Android:

```bash
npx mobilewright test 'webdriverio.spec.ts' --project=android
```

To execute only iOS:

```bash
npx mobilewright test 'webdriverio.spec.ts' --project=ios
```

### Important

For parallel Android and iOS execution, make sure both an **Android device/emulator** and an **iOS device/simulator** are available and ready before starting the test execution.