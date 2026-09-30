import { When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ProductsPage from '../pageobjects/products.page';
import QrCodePage from '../pageobjects/qrcode.page';

When('ele abre o leitor de QR Code pelo menu', async () => {
  await QrCodePage.openFromMenu();
});

Then('a pré-visualização da câmera deve ser exibida', async () => {
  const isDisplayed = await QrCodePage.isCameraPreviewDisplayed();
  expect(isDisplayed).toBe(true);
});

When('ele volta para a tela anterior', async () => {
  await QrCodePage.goBack();
});

Then('o catálogo de produtos deve ser exibido novamente', async () => {
  const isDisplayed = await ProductsPage.isCatalogDisplayed();
  expect(isDisplayed).toBe(true);
});
