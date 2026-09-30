import { When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import FingerPrintPage from '../pageobjects/fingerprint.page';

When('ele abre a tela de FingerPrint pelo menu', async () => {
  await FingerPrintPage.openFromMenu();
});

Then('uma mensagem informando que a biometria não está disponível deve ser exibida', async () => {
  const isDisplayed = await FingerPrintPage.isUnavailableMessageDisplayed();
  expect(isDisplayed).toBe(true);
});

When('ele fecha o aviso', async () => {
  await FingerPrintPage.dismissUnavailableDialog();
});

Then('a opção de login por biometria deve permanecer desabilitada', async () => {
  const isEnabled = await FingerPrintPage.isToggleEnabled();
  expect(isEnabled).toBe(false);
});
