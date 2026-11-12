import { Screen, Device, expect } from '@mobilewright/core';

export class LoginPage{
constructor(
    private readonly screen:Screen,
    private readonly device:Device,
){}

//locators
get WebDriverText(){
    return this.screen.getByRole('text', { name: 'WEBDRIVER' });
}
get LoginLink(){
    return this.screen.getByRole('button', { name: 'Login' });
}
get UsernameTextField(){
    return this.screen.getByPlaceholder('Email');
}
get PasswordTextField(){
    return this.screen.getByPlaceholder('Password');
}
get LoginButton(){
    return this.screen.getByRole('text', { name: 'LOGIN' });
}
get SuccessLoginText(){
    return this.screen.getByText('You are logged in!');
}
get OkButtonOnSuccess(){
    return this.screen.getByRole('button', { name: 'OK' });
}

//actions
async loginToApp(username:string, password:string){
    await expect(this.WebDriverText).toBeVisible();
    await this.LoginLink.tap();
    await this.UsernameTextField.fill(username);
    await this.PasswordTextField.fill(password);
    await this.LoginButton.tap();
    await expect(this.SuccessLoginText).toBeVisible();
    await this.OkButtonOnSuccess.tap();
}
}