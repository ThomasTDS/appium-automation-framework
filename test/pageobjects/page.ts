import { $, browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

/**
 * Classe base do padrao Page Object. Cada tela do aplicativo deve ter sua
 * propria classe estendendo esta, expondo apenas metodos de negocio (ex.:
 * `login(usuario, senha)`), sem vazar detalhes de localizadores para as
 * step definitions.
 *
 * O menu lateral (hamburger menu) e um componente global, presente em
 * qualquer tela do app, por isso seus metodos ficam aqui na base.
 */
export default abstract class Page {
  protected readonly appId = 'com.saucelabs.mydemoapp.android';

  private get menuButton() {
    return $('~View menu');
  }

  protected byText(text: string) {
    return $(`android=new UiSelector().text("${text}")`);
  }

  protected async waitForDisplayed(
    element: ChainablePromiseElement,
    // Usa o waitforTimeout global (wdio.conf.ts) como padrao, em vez de um
    // valor fixo aqui, para existir um unico lugar de configuracao do
    // tempo de espera.
    timeout: number = browser.options.waitforTimeout ?? 20000,
  ): Promise<void> {
    await element.waitForDisplayed({ timeout });
  }

  protected async tap(element: ChainablePromiseElement): Promise<void> {
    await this.waitForDisplayed(element);
    await element.click();
  }

  protected async setValue(element: ChainablePromiseElement, value: string): Promise<void> {
    await this.waitForDisplayed(element);
    await element.setValue(value);
  }

  protected async getText(element: ChainablePromiseElement): Promise<string> {
    await this.waitForDisplayed(element);
    return element.getText();
  }

  public async openMenu(): Promise<void> {
    await this.tap(this.menuButton);
  }

  public async selectMenuOption(optionText: string): Promise<void> {
    await this.openMenu();
    await this.tap(this.byText(optionText));
  }

  /**
   * Reinicia o app para um estado limpo e conhecido (deslogado, sem
   * carrinho, sem dados de sessoes anteriores). Chamado antes de cada
   * cenario (ver test/step-definitions/hooks.ts).
   *
   * A opcao "Reset App State" disponivel no menu do proprio app foi
   * descartada para isso: alem de exigir navegar por dois dialogos nativos,
   * ela nao desloga o usuario, e reabrir o menu logo em seguida (para
   * deslogar manualmente) se mostrou nao-confiavel em execucao automatizada
   * (mesmo funcionando de forma consistente quando reproduzido manualmente
   * mais devagar). Usar os comandos nativos do driver (equivalentes a
   * `adb shell pm clear` + relancar o app) e o mesmo mecanismo usado com
   * sucesso durante toda a investigacao manual, e nao depende de nenhuma
   * navegacao dentro do app.
   */
  public async resetApp(): Promise<void> {
    await browser.execute('mobile: terminateApp', { appId: this.appId });
    await browser.execute('mobile: clearApp', { appId: this.appId });
    await browser.execute('mobile: activateApp', { appId: this.appId });
  }

  public async pause(ms: number): Promise<void> {
    await browser.pause(ms);
  }
}
