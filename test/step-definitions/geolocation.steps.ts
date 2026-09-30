import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import GeoLocationPage from '../pageobjects/geolocation.page';

Given(
  'que a localização do dispositivo foi definida para latitude {string} e longitude {string}',
  async (latitude: string, longitude: string) => {
    await browser.setGeoLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      altitude: 0,
    });
  },
);

When('ele abre a tela de Geo Location pelo menu', async () => {
  await GeoLocationPage.openFromMenu();
});

// O provedor de localizacao mockada do Android reproduz o valor definido
// com uma pequena perda de precisao (ex.: "-23.5505" e exibido como
// "-23.5504983"), consistente mesmo entre execucoes - por isso a
// comparacao usa uma tolerancia numerica, em vez de igualdade exata de
// string.
const COORDINATE_TOLERANCE = 0.0001;

Then('a latitude exibida deve ser aproximadamente {string}', async (expectedLatitude: string) => {
  const latitude = await GeoLocationPage.getLatitude();
  expect(Math.abs(Number(latitude) - Number(expectedLatitude))).toBeLessThan(COORDINATE_TOLERANCE);
});

Then('a longitude exibida deve ser aproximadamente {string}', async (expectedLongitude: string) => {
  const longitude = await GeoLocationPage.getLongitude();
  expect(Math.abs(Number(longitude) - Number(expectedLongitude))).toBeLessThan(
    COORDINATE_TOLERANCE,
  );
});
