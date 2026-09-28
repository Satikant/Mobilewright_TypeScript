import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests', //OR: '.',
  timeout:60000,
  retries:1,
  viewTree:'on-failure',
  bundleId:'com.swaglabsmobileapp',
  workers:1,
  projects:[
      {
      name: 'ios',
      use: {
        platform: 'ios',
        installApps: '/Users/comviva/Documents/Automation/Mobilewright_TypeScript/testAppResources/TestApp.app',
      },
    },
    {
      name: 'android',
      use: {
        platform: 'android',
        installApps:'/Users/comviva/Documents/Automation/Mobilewright_TypeScript/testAppResources/Android.SauceLabs.apk',
        // deviceName:/.*/,
        deviceName:/Pixel 10 Pro/ //deviceId--> Pixel_10_Pro
      },
    },
  ],
  autoAppLaunch:true,
  reporter: 'html',
  fullyParallel:false,
});
