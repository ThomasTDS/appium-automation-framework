import { $ } from '@wdio/globals';
import Page from './page';

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  fullName: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
}

class CheckoutPage extends Page {
  private get fullNameInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/fullNameET")`);
  }

  private get addressLine1Input() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/address1ET")`);
  }

  private get cityInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/cityET")`);
  }

  private get zipCodeInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/zipET")`);
  }

  private get countryInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/countryET")`);
  }

  // A tela de endereco e a de pagamento reaproveitam o mesmo resourceId
  // (paymentBtn) para o botao de avancar, cada uma com um content-desc
  // proprio - a mesma situacao ja observada em cartBt (ver cart.page.ts).
  private get toPaymentButton() {
    return $('~Saves user info for checkout');
  }

  private get cardNameInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/nameET")`);
  }

  private get cardNumberInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/cardNumberET")`);
  }

  private get expirationDateInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/expirationDateET")`);
  }

  private get securityCodeInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/securityCodeET")`);
  }

  private get reviewOrderButton() {
    return $('~Saves payment info and launches screen to review checkout data');
  }

  private get placeOrderButton() {
    return $('~Completes the process of checkout');
  }

  private get confirmationMessage() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/swagTV")`);
  }

  public async fillShippingAddress(address: ShippingAddress): Promise<void> {
    await this.setValue(this.fullNameInput, address.fullName);
    await this.setValue(this.addressLine1Input, address.addressLine1);
    await this.setValue(this.cityInput, address.city);
    await this.setValue(this.zipCodeInput, address.zipCode);
    await this.setValue(this.countryInput, address.country);
  }

  public async confirmShippingAddress(): Promise<void> {
    await this.tap(this.toPaymentButton);
  }

  public async fillPaymentDetails(payment: PaymentDetails): Promise<void> {
    await this.setValue(this.cardNameInput, payment.fullName);
    await this.setValue(this.cardNumberInput, payment.cardNumber);
    await this.setValue(this.expirationDateInput, payment.expirationDate);
    await this.setValue(this.securityCodeInput, payment.securityCode);
  }

  public async confirmPayment(): Promise<void> {
    await this.tap(this.reviewOrderButton);
  }

  public async placeOrder(): Promise<void> {
    await this.tap(this.placeOrderButton);
  }

  public async isOrderConfirmed(): Promise<boolean> {
    return this.confirmationMessage.isDisplayed();
  }
}

export default new CheckoutPage();
