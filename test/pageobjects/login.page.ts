import { $ } from '@wdio/globals';
import Page from './page';

class LoginPage extends Page {
  private get usernameInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/nameET")`);
  }

  private get passwordInput() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/passwordET")`);
  }

  private get loginButton() {
    return $('~Tap to login with given credentials');
  }

  private get errorMessage() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/passwordErrorTV")`);
  }

  public async openLoginScreen(): Promise<void> {
    await this.selectMenuOption('Log In');
  }

  public async fillCredentials(username: string, password: string): Promise<void> {
    await this.setValue(this.usernameInput, username);
    await this.setValue(this.passwordInput, password);
  }

  public async submitLogin(): Promise<void> {
    await this.tap(this.loginButton);
  }

  public async isMenuOptionVisible(optionText: string): Promise<boolean> {
    await this.openMenu();
    return this.byText(optionText).isDisplayed();
  }

  public async getErrorMessageText(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}

export default new LoginPage();
