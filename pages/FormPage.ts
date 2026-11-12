import { Screen, Device, expect } from '@mobilewright/core';

export class FormPage{
constructor(
    private readonly screen:Screen,
    private readonly device:Device,
){}

//Locators
get FormLink(){
    return this.screen.getByLabel('Forms');
}
get InputFiled(){
    return this.screen.getByPlaceholder('Type something');
}
get SwitchToggle(){
    return this.screen.getByRole('switch');
}
get TypedText(){
    return this.screen.getByRole('text', { name: 'You have typed:' });
}
get ActiveButton(){
    return this.screen.getByRole('text', { name: 'Active' });
}
get ButtonActiveTextInpopup(){
    return this.screen.getByText('This button is active');
}
get OkButtonInPopup(){
    return this.screen.getByRole('button', { name: 'OK' });
}

async fillTheForm(text:string){
    await this.FormLink.tap();
    await this.InputFiled.fill(text);
    await this.SwitchToggle.tap();
    await this.TypedText.tap();
    await this.ActiveButton.tap();
    await expect(this.ButtonActiveTextInpopup).toBeVisible();
    await this.OkButtonInPopup.tap();


}
}