import { browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

/**
 * Classe base do padrao Page Object. Cada tela do aplicativo deve ter sua
 * propria classe estendendo esta, expondo apenas metodos de negocio (ex.:
 * `login(usuario, senha)`), sem vazar detalhes de localizadores para as
 * step definitions.
 */
export default abstract class Page {
  protected async waitForDisplayed(
    element: ChainablePromiseElement,
    timeout = 10000,
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

  public async pause(ms: number): Promise<void> {
    await browser.pause(ms);
  }
}
