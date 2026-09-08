import { Before } from '@wdio/cucumber-framework';
import LoginPage from '../pageobjects/login.page';

// Garante que cada cenario comece com o app num estado limpo (deslogado,
// carrinho vazio), independente do que o cenario anterior tenha deixado.
// Sem isso, cenarios no mesmo arquivo .feature compartilham a mesma sessao
// do Appium e "vazam" estado entre si.
//
// Nao da para dar um timeout maior so para este hook: o @wdio/cucumber-framework
// (build/index.js, metodo wrapSteps) ignora a opcao `timeout` passada aqui e
// sempre usa o valor global de `cucumberOpts.timeout` (wdio.conf.ts) para
// tudo - steps e hooks. Por isso o timeout de `resetApp()` e controlado la,
// nao aqui.
Before(async () => {
  await LoginPage.resetApp();
});
