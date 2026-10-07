import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests', //OR: '.',
  timeout:60000,
  retries:1,
  viewTree:'on-failure',  
  bundleId:'org.wdiodemoapp', //iOS - BundleID
  // bundleId:'com.wdiodemoapp', //Android - PackageName
  // bundleId:'com.saucelabs.SwagLabsMobileApp',
  workers:2,
  projects:[
      {
      name: 'ios',
      use: {
        platform: 'ios',
        installApps: '/Users/comviva/Documents/Automation/Mobilewright_TypeScript/testAppResources/wdiodemoapp.zip',
        deviceName:/iPhone 18 Pro/
      },
    },
    {
      name: 'android',
      use: {
        platform: 'android',
        installApps:'/Users/comviva/Documents/Automation/Mobilewright_TypeScript/testAppResources/webdriver.io.apk',
        // deviceName:/.*/,
        deviceName:/Pixel 10 Pro/ //deviceId--> Pixel_10_Pro
      },
    },
  ],
  autoAppLaunch:true,
  reporter: 'html',
  fullyParallel:false,
});
