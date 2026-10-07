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
