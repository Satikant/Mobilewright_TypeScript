import {test} from '../fixture/Fixtures'

test.only('Login with valid credentials',async({login_page})=>{
console.log("Login is Successful");
})
test('Login with invalid credentials',async({login_page_invalid})=>{
console.log("Login is Unsuccessful");
})
test('Fill form',async({form_page})=>{
console.log("Form Created");
})