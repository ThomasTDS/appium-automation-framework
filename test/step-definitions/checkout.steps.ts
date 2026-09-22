import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import ProductsPage from '../pageobjects/products.page';
import CartPage from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.page';

Given('que o usuário está logado e adicionou um produto ao carrinho', async () => {
  await LoginPage.openLoginScreen();
  await LoginPage.fillCredentials('bod@example.com', '10203040');
  await LoginPage.submitLogin();
  await ProductsPage.waitForCatalogToLoad();
  await ProductsPage.openFirstProduct();
  await ProductsPage.addCurrentProductToCart();
  await ProductsPage.openCart();
});

When('ele avança para o checkout', async () => {
  await CartPage.proceedToCheckout();
});

When(
  'ele preenche o endereço de entrega com nome {string}, endereço {string}, cidade {string}, CEP {string} e país {string}',
  async (
    fullName: string,
    addressLine1: string,
    city: string,
    zipCode: string,
    country: string,
  ) => {
    await CheckoutPage.fillShippingAddress({ fullName, addressLine1, city, zipCode, country });
  },
);

When('ele avança para a tela de pagamento', async () => {
  await CheckoutPage.confirmShippingAddress();
});

When(
  'ele preenche os dados do cartão com nome {string}, número {string}, validade {string} e código de segurança {string}',
  async (fullName: string, cardNumber: string, expirationDate: string, securityCode: string) => {
    await CheckoutPage.fillPaymentDetails({ fullName, cardNumber, expirationDate, securityCode });
  },
);

When('ele avança para a revisão do pedido', async () => {
  await CheckoutPage.confirmPayment();
});

When('ele confirma o pedido', async () => {
  await CheckoutPage.placeOrder();
});

Then('a compra deve ser concluída com sucesso', async () => {
  const isConfirmed = await CheckoutPage.isOrderConfirmed();
  expect(isConfirmed).toBe(true);
});
