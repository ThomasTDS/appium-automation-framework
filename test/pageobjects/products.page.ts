import { $ } from '@wdio/globals';
import Page from './page';

class ProductsPage extends Page {
  private get firstProductImage() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/productIV").instance(0)`);
  }

  private get addToCartButton() {
    return $('~Tap to add product to cart');
  }

  private get cartBadge() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/cartTV")`);
  }

  private get cartButton() {
    return $('~View cart');
  }

  private get increaseQuantityButton() {
    return $('~Increase item quantity');
  }

  public async waitForCatalogToLoad(): Promise<void> {
    await this.waitForDisplayed(this.firstProductImage);
  }

  public async openFirstProduct(): Promise<void> {
    await this.tap(this.firstProductImage);
  }

  public async addCurrentProductToCart(): Promise<void> {
    await this.tap(this.addToCartButton);
  }

  public async getCartBadgeCount(): Promise<string> {
    return this.getText(this.cartBadge);
  }

  public async openCart(): Promise<void> {
    await this.tap(this.cartButton);
  }

  public async isCatalogDisplayed(): Promise<boolean> {
    return this.firstProductImage.isDisplayed();
  }

  public async increaseQuantity(times: number): Promise<void> {
    for (let i = 0; i < times; i += 1) {
      await this.tap(this.increaseQuantityButton);
    }
  }
}

export default new ProductsPage();
