// this is a skeleton test for mobilewright (see https://github.com/mobile-next/mobilewright/blob/main/README.md)
// for documentation see: https://mobilewright.dev/docs/
// for agent skill see: https://github.com/mobile-next/mobilewright-skill
import { test, expect } from '@mobilewright/test';

test('app launches shows home screen and Perfrom Checkout', async ({ screen, device }) => {
  // await expect(screen.getByText('Welcome')).toBeVisible();
  await screen.getByRole('text', { name: 'standard_user'}).tap();
  await screen.getByLabel('test-LOGIN').tap();
  await expect(screen.getByRole('text', { name: 'PRODUCTS' })).toBeVisible();
  await screen.getByRole('text', { name: 'ADD TO CART' }).tap();
  await screen.getByLabel('test-Cart').tap();
  await screen.getByRole('text', { name: 'CHECKOUT' }).tap();
  await screen.getByRole('textfield', { name: 'test-First Name' }).fill('JOHN');
  await screen.getByRole('textfield', { name: 'test-Last Name' }).fill('MATHEW');
  await screen.getByRole('textfield', { name: 'test-Zip/Postal Code' }).fill('112233');
  await screen.getByRole('text', { name: 'CONTINUE' }).tap();
  await screen.getByLabel('test-FINISH').scrollIntoViewIfNeeded();
  await screen.getByLabel('test-FINISH').tap();
  console.log(await screen.getByRole('text', { name: 'THANK YOU FOR YOU ORDER' }));
  await screen.getByLabel('test-BACK HOME').tap();
  // await screen.getByRole('text', { name: 'REMOVE' }).tap();
});
