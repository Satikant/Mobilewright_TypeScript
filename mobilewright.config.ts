import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests', //OR: '.',
  timeout:60000,
  retries:1,
  viewTree:'on-failure',
  //bundleId:'org.wdiodemoapp' || 'com.wdiodemoapp',
  workers:1, //Set more than 1 worker for Parallel execution
  projects:[
      {
      name: 'ios',
      use: {
        platform: 'ios',
        bundleId:'org.wdiodemoapp',
        installApps: './testapps/iosWdioapp.zip',
        deviceName:/iPhone 18 Pro/
      },
    },
    {
      name: 'android',
      use: {
        platform: 'android',
        bundleId:'com.wdiodemoapp',
        installApps:'./testapps/AndroidWdio.apk',
        // deviceName:/.*/,
        deviceName:/Pixel 10 Pro/ //deviceId--> Pixel_10_Pro
      },
    },
  ],
  autoAppLaunch:true,
  reporter: 'html',
  fullyParallel:false, //true for parallel execution
});
