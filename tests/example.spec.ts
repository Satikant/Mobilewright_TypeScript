// this is a skeleton test for mobilewright (see https://github.com/mobile-next/mobilewright/blob/main/README.md)
// for documentation see: https://mobilewright.dev/docs/
// for agent skill see: https://github.com/mobile-next/mobilewright-skill
import { test, expect } from '@mobilewright/test';

test('app launches and shows home screen', async ({ screen, device }) => {
  // await expect(screen.getByText('Welcome')).toBeVisible();
  await screen.getByRole('text', { name: 'standard_user' }).tap();
  await screen.getByLabel('test-LOGIN').tap();
  await expect(screen.getByRole('text', { name: 'PRODUCTS' })).toBeVisible();
  await screen.getByRole('text', { name: 'ADD TO CART' }).tap();
  await screen.getByLabel('test-Cart').tap();
  await screen.getByRole('text', { name: 'REMOVE' }).tap();
});
