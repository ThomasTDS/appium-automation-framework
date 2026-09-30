import { $ } from '@wdio/globals';
import Page from './page';

class QrCodePage extends Page {
  private get cameraPreview() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/previewView")`);
  }

  public async openFromMenu(): Promise<void> {
    await this.selectMenuOption('QR Code Scanner');
  }

  public async isCameraPreviewDisplayed(): Promise<boolean> {
    await this.waitForDisplayed(this.cameraPreview);
    return this.cameraPreview.isDisplayed();
  }
}

export default new QrCodePage();
