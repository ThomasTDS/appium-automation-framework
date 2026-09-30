import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import DrawingPage from '../pageobjects/drawing.page';

Given('que o usuário está na tela de desenho', async () => {
  await DrawingPage.openFromMenu();
});

When('ele desenha uma linha no quadro', async () => {
  await DrawingPage.drawLine();
});

When('ele toca em salvar', async () => {
  await DrawingPage.save();
});

Then('uma mensagem confirmando que o desenho foi salvo deve ser exibida', async () => {
  const isDisplayed = await DrawingPage.isSaveConfirmationDisplayed();
  expect(isDisplayed).toBe(true);
});
