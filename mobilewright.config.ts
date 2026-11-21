import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests', //OR: '.',
  timeout:60000,
  retries:1,
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
        // deviceName:/.*/,
        deviceName:/Pixel 10 Pro/, //deviceId--> Pixel_10_Pro
      },
    },
  ],
  autoAppLaunch:true,
  fullyParallel:true, //true for parallel execution
  // reporter: 'html',
  reporter: [
    ['list'],
    ['html'],
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
