import { $ } from '@wdio/globals';
import Page from './page';

class GeoLocationPage extends Page {
  private get latitudeValue() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/latitudeTV")`);
  }

  private get longitudeValue() {
    return $(`android=new UiSelector().resourceId("${this.appId}:id/longitudeTV")`);
  }

  public async openFromMenu(): Promise<void> {
    await this.selectMenuOption('Geo Location');
  }

  public async getLatitude(): Promise<string> {
    return this.getText(this.latitudeValue);
  }

  public async getLongitude(): Promise<string> {
    return this.getText(this.longitudeValue);
  }
}

export default new GeoLocationPage();
