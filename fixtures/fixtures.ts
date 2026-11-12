import { test as base } from "@mobilewright/test";
import { LoginPage } from "../pages/Loginpage";
import { FormPage } from "../pages/FormPage";

type MyFixtures={
    login_page: LoginPage;
    form_page:FormPage;
};
export const test=base.extend<MyFixtures>({

    login_page:async({screen,device},use)=>{
    const login_page = new LoginPage(screen,device);
    await login_page.loginToApp('testio@gmail.com','test@123');
    await use(login_page);
    },

    form_page:async({screen,device},use)=>{
    const form_page = new FormPage(screen,device);
    await form_page.fillTheForm('TestForm');
    await use(form_page);
    }
})