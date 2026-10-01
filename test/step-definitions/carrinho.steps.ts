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

When('ele remove o item do carrinho', async () => {
  await CartPage.removeFirstItem();
});

When('ele abre o primeiro produto da lista', async () => {
  await ProductsPage.openFirstProduct();
});

When('ele aumenta a quantidade em {int}', async (amount: number) => {
  await ProductsPage.increaseQuantity(amount);
});

When('ele adiciona o produto ao carrinho', async () => {
  await ProductsPage.addCurrentProductToCart();
});

When('ele abre o carrinho', async () => {
  await ProductsPage.openCart();
});

When('ele volta para o catálogo e adiciona o mesmo produto novamente', async () => {
  await ProductsPage.goBack();
  await ProductsPage.openFirstProduct();
  await ProductsPage.addCurrentProductToCart();
});

// Aceita "item" (singular) e "itens" (plural) no mesmo step, ja que a
// pluralizacao em portugues muda o final da palavra (nao e so um "s" no
// fim, como em ingles), o que a sintaxe de texto opcional das Cucumber
// Expressions (ex.: "item(s)") nao cobre.
Then(/^o carrinho deve exibir (\d+) (?:item|itens)$/, async (expectedCount: string) => {
  const badgeText = await ProductsPage.getCartBadgeCount();
  expect(Number(badgeText)).toBe(Number(expectedCount));
});

Then('a quantidade do item no carrinho deve ser {int}', async (expectedQuantity: number) => {
  const quantity = await CartPage.getQuantity();
  expect(quantity).toBe(expectedQuantity);
});

Then('o item no carrinho deve ser {string}', async (expectedTitle: string) => {
  const title = await CartPage.getFirstItemTitle();
  expect(title).toBe(expectedTitle);
});

Then('o aplicativo deve solicitar o login', async () => {
  const isOnLoginScreen = await LoginPage.isDisplayed();
  expect(isOnLoginScreen).toBe(true);
});

Then('o carrinho deve exibir a mensagem {string}', async (expectedMessage: string) => {
  const isVisible = await CartPage.isTextDisplayed(expectedMessage);
  expect(isVisible).toBe(true);
});
