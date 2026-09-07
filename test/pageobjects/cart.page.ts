import { $ } from '@wdio/globals';
import Page from './page';

class CartPage extends Page {
  private get firstItemTitle() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/titleTV").instance(0)`);
  }

  private get checkoutButton() {
    return $('~Confirms products for checkout');
  }

  public async getFirstItemTitle(): Promise<string> {
    return this.getText(this.firstItemTitle);
  }

  public async proceedToCheckout(): Promise<void> {
    await this.tap(this.checkoutButton);
  }
}

export default new CartPage();
