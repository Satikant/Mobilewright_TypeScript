import { test, expect } from '@mobilewright/test';

test('Launch and login to the app', async({screen,device})=>{
await expect(screen.getByRole('text', { name: 'WEBDRIVER' })).toBeVisible();
await screen.getByRole('button', { name: 'Login' }).tap();
await screen.getByPlaceholder('Email').fill('testio@gmail.com');
await screen.getByPlaceholder('Password').fill('test@123');
await screen.getByRole('text', { name: 'LOGIN' }).tap();
await expect(screen.getByText('You are logged in!')).toBeVisible();
await screen.getByRole('button', { name: 'OK' }).tap();
});
test('Fill the form post login', async({screen,device})=>{
await screen.getByLabel('Forms').tap();
await screen.getByPlaceholder('Type something').fill('TestForm');
await screen.getByRole('switch').tap();
await screen.getByRole('text', { name: 'You have typed:' }).tap();
await screen.getByRole('text', { name: 'Active' }).tap();
await expect(screen.getByText('This button is active')).toBeVisible();
await screen.getByRole('button', { name: 'OK' }).tap();
});