import { $ } from '@wdio/globals';
import Page from './page';

const APP_ID = 'com.saucelabs.mydemoapp.android';

class LoginPage extends Page {
  private get menuButton() {
    return $('~View menu');
  }

  private get usernameInput() {
    return $(`android=new UiSelector().resourceId("${APP_ID}:id/nameET")`);
  }

  private get passwordInput() {
    return $(`android=new UiSelector().resourceId("${APP_ID}:id/passwordET")`);
  }

  private get loginButton() {
    return $('~Tap to login with given credentials');
  }

  private menuOption(optionText: string) {
    return $(`android=new UiSelector().text("${optionText}")`);
  }

  public async openLoginScreen(): Promise<void> {
    await this.tap(this.menuButton);
    await this.tap(this.menuOption('Log In'));
  }

  public async fillCredentials(username: string, password: string): Promise<void> {
    await this.setValue(this.usernameInput, username);
    await this.setValue(this.passwordInput, password);
  }

  public async submitLogin(): Promise<void> {
    await this.tap(this.loginButton);
  }

  public async isMenuOptionVisible(optionText: string): Promise<boolean> {
    await this.tap(this.menuButton);
    return this.menuOption(optionText).isDisplayed();
  }
}

export default new LoginPage();
