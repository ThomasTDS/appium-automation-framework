import { $ } from '@wdio/globals';
import Page from './page';

class FingerPrintPage extends Page {
  private get toggle() {
    return $('~Enable or disable biometric login');
  }

  private get unavailableMessage() {
    return this.byText(
      'Biometric is or not supported or not enable on your device. Please check your device or your settings.',
    );
  }

  // Enquanto o AlertDialog nativo esta aberto, a arvore de acessibilidade
  // so expoe a janela do proprio dialogo - o switch por tras dele so volta
  // a ser consultavel depois que o dialogo e fechado (ver dismissDialog()).
  private get dialogOkButton() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  public async openFromMenu(): Promise<void> {
    await this.selectMenuOption('FingerPrint');
  }

  public async isUnavailableMessageDisplayed(): Promise<boolean> {
    await this.waitForDisplayed(this.unavailableMessage);
    return this.unavailableMessage.isDisplayed();
  }

  public async dismissUnavailableDialog(): Promise<void> {
    await this.tap(this.dialogOkButton);
  }

  public async isToggleEnabled(): Promise<boolean> {
    const checked = await this.toggle.getAttribute('checked');
    return checked === 'true';
  }
}

export default new FingerPrintPage();
