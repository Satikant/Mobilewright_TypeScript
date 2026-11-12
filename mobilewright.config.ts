import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests', //OR: '.',
  timeout:60000,
  retries:1,
  viewTree:'on-failure',
  // bundleId:'com.saucelabs.SwagLabsMobileApp',
  workers:2,
  projects:[
      {
      name: 'ios',
      use: {
        platform: 'ios',
        bundleId:'org.wdiodemoapp',
        installApps: './testapps/wdiodemoapp.zip',
        deviceName:/iPhone 18 Pro/
      },
    },
    {
      name: 'android',
      use: {
        platform: 'android',
        bundleId:'com.wdiodemoapp',
        installApps:'./testapps/webdriver.io.apk',
        // deviceName:/.*/,
        deviceName:/Pixel 10 Pro/ //deviceId--> Pixel_10_Pro
      },
    },
  ],
  autoAppLaunch:true,
  reporter: 'html',
  fullyParallel:false, //true for parallel execution
});
