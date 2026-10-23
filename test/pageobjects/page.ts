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

  public async isTextDisplayed(text: string): Promise<boolean> {
    return this.byText(text).isDisplayed();
  }

  /**
   * Reinicia o app para um estado limpo e conhecido (deslogado, sem
   * carrinho, sem dados de sessoes anteriores). Chamado antes de cada
   * cenario (ver test/step-definitions/hooks.ts).
   *
   * Duas abordagens foram tentadas antes desta e descartadas:
   * 1. A opcao "Reset App State" do menu do proprio app: alem de exigir
   *    navegar por dois dialogos nativos, ela nao desloga o usuario, e
   *    reabrir o menu logo em seguida se mostrou nao-confiavel em execucao
   *    automatizada.
   * 2. Comandos nativos do driver (`mobile: terminateApp` + `clearApp` +
   *    `activateApp`, equivalentes a `adb shell pm clear` + relancar o
   *    app): funcionou de forma confiavel no emulador local, mas falhou de
   *    forma consistente no CI (o app relancado nao ficava navegavel
   *    dentro do timeout configurado, possivelmente por uma verificacao de
   *    seguranca do Android/emulador que so acontece no primeiro lancamento
   *    de um AVD novo).
   *
   * `browser.reloadSession()` cria uma sessao Appium inteiramente nova
   * (reinstala/relanca o app do zero), usando o mesmo caminho de
   * inicializacao que ja e comprovadamente confiavel no inicio de cada
   * execucao de teste - em vez de tentar reproduzir esse comportamento
   * manualmente com comandos soltos.
   */
  public async resetApp(): Promise<void> {
    await browser.reloadSession();
  }

  public async pause(ms: number): Promise<void> {
    await browser.pause(ms);
  }

  public async goBack(): Promise<void> {
    await browser.back();
  }

  /**
   * Compara a tela atual contra a baseline visual salva sob a mesma tag
   * (ver test/visual-baseline/). Retorna o percentual de diferença (0 =
   * identica); quem chama decide a tolerancia aceitavel.
   *
   * O tipo de retorno do `checkScreen` tambem cobre sessao multiremote
   * (um resultado por instancia) e um formato de objeto detalhado, nenhum
   * dos dois usado neste projeto (uma unica capability, opcoes padrao) -
   * por isso a checagem em runtime abaixo, em vez de so um cast de tipo.
   */
  public async compareScreenWithBaseline(tag: string): Promise<number> {
    const result = await browser.checkScreen(tag);
    if (typeof result !== 'number') {
      throw new Error(
        'Resultado inesperado do checkScreen: esperava um numero (sessao unica, sem multiremote).',
      );
    }
    return result;
  }
}
