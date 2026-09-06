import { Before } from '@wdio/cucumber-framework';
import LoginPage from '../pageobjects/login.page';

// Garante que cada cenario comece com o app num estado limpo (deslogado,
// carrinho vazio), independente do que o cenario anterior tenha deixado.
// Sem isso, cenarios no mesmo arquivo .feature compartilham a mesma sessao
// do Appium e "vazam" estado entre si.
Before(async () => {
  await LoginPage.resetApp();
});
