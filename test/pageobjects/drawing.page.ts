import { $, browser } from '@wdio/globals';
import Page from './page';

class DrawingPage extends Page {
  private get canvas() {
    return $('~Pad to draw on');
  }

  private get saveButton() {
    return $('~Save anything drawn on pad');
  }

  private get saveConfirmationMessage() {
    return this.byText('Drawing saved successfully to gallery');
  }

  public async openFromMenu(): Promise<void> {
    await this.selectMenuOption('Drawing');
  }

  /**
   * Desenha uma linha reta no quadro usando a W3C Actions API (ponteiro de
   * toque), em vez de coordenadas absolutas de tela: os pontos de origem e
   * destino sao relativos ao centro do proprio elemento do quadro, o que
   * mantem o gesto valido independente do tamanho/resolucao do dispositivo.
   */
  public async drawLine(): Promise<void> {
    await this.waitForDisplayed(this.canvas);
    await browser
      .action('pointer', { parameters: { pointerType: 'touch' } })
      .move({ duration: 0, origin: this.canvas, x: -150, y: -200 })
      .down()
      .move({ duration: 300, origin: this.canvas, x: 150, y: 200 })
      .up()
      .perform();
  }

  public async save(): Promise<void> {
    await this.tap(this.saveButton);
  }

  public async isSaveConfirmationDisplayed(): Promise<boolean> {
    await this.waitForDisplayed(this.saveConfirmationMessage);
    return this.saveConfirmationMessage.isDisplayed();
  }
}

export default new DrawingPage();
