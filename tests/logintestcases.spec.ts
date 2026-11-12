import {test} from'@mobilewright/test';
import {LoginPage} from '../pages/Loginpage';


test('SampleTescase Execution',async({device,screen})=>{
const loginPageInstance= new LoginPage(screen,device);
await loginPageInstance.loginToApp('testio@gmail.com','test@123');
})