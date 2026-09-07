import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ProductsPage from '../pageobjects/products.page';
import CartPage from '../pageobjects/cart.page';
import LoginPage from '../pageobjects/login.page';

Given('que o usuário está navegando pelo catálogo de produtos', async () => {
  await ProductsPage.waitForCatalogToLoad();
});

When('ele adiciona o primeiro produto da lista ao carrinho', async () => {
  await ProductsPage.openFirstProduct();
  await ProductsPage.addCurrentProductToCart();
  await ProductsPage.openCart();
});

When('ele tenta finalizar a compra sem estar logado', async () => {
  await CartPage.proceedToCheckout();
});

Then('o carrinho deve exibir {int} item', async (expectedCount: number) => {
  const badgeText = await ProductsPage.getCartBadgeCount();
  expect(Number(badgeText)).toBe(expectedCount);
});

Then('o item no carrinho deve ser {string}', async (expectedTitle: string) => {
  const title = await CartPage.getFirstItemTitle();
  expect(title).toBe(expectedTitle);
});

Then('o aplicativo deve solicitar o login', async () => {
  const isOnLoginScreen = await LoginPage.isDisplayed();
  expect(isOnLoginScreen).toBe(true);
});
