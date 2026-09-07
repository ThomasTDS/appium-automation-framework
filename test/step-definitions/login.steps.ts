import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';

Given('que o usuário está na tela de login', async () => {
  await LoginPage.openLoginScreen();
});

When(
  'ele preenche o usuário {string} e a senha {string}',
  async (username: string, password: string) => {
    await LoginPage.fillCredentials(username, password);
  },
);

When('toca no botão de login', async () => {
  await LoginPage.submitLogin();
});

When('ele toca no botão de login sem preencher usuário ou senha', async () => {
  await LoginPage.submitLogin();
});

Then('o menu do aplicativo deve exibir a opção {string}', async (menuOption: string) => {
  const isVisible = await LoginPage.isMenuOptionVisible(menuOption);
  expect(isVisible).toBe(true);
});

Then('uma mensagem de erro {string} deve ser exibida', async (expectedMessage: string) => {
  const actualMessage = await LoginPage.getErrorMessageText();
  expect(actualMessage).toBe(expectedMessage);
});

Then('a mensagem {string} deve ser exibida', async (expectedMessage: string) => {
  const isVisible = await LoginPage.isTextDisplayed(expectedMessage);
  expect(isVisible).toBe(true);
});
