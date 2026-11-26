import { test as base } from "@mobilewright/test";
import { LoginPage } from "../pages/LoginPage";
import { FormPage } from "../pages/FormPage";
import { TestData } from "../utils/TestData";


type MyFixtures = {
    data:TestData;
    login_page: LoginPage;
    login_page_invalid: LoginPage;
    form_page: FormPage;
};

export const test = base.extend<MyFixtures>({
    login_page: async ({ screen, device }, use) => {
        const valdloginData = TestData.getValidLoginData();
        const login_page = new LoginPage(screen, device);
        await login_page.loginToApp(valdloginData.username,valdloginData.password);
        await use(login_page);
    },
    login_page_invalid: async ({ screen, device }, use) => {
        const invaldloginData = TestData.getInvalidLoginData();
        const login_page = new LoginPage(screen, device);
        await login_page.loginToApp(invaldloginData.username,invaldloginData.password);
        await use(login_page);
    },

    form_page: async ({ screen, device }, use) => {
        const formData = TestData.getValidFormText();
        const form_page = new FormPage(screen, device);
        await form_page.fillTheForm(formData.formtext);
        await use(form_page);
    }
});
// Centralised video and failure diagnostics configuration
test.use({
  video: 'retain-on-failure',
  viewTree: 'on-failure',
});

