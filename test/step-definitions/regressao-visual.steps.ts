import { Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ProductsPage from '../pageobjects/products.page';

// Tolerancia pequena (em vez de exigir 0% de diferenca) para absorver
// variacoes minimas de antialiasing/compressao entre execucoes no mesmo
// ambiente, sem deixar passar uma mudanca visual real.
const MISMATCH_TOLERANCE_PERCENT = 0.1;

Then('a tela deve corresponder à baseline visual {string}', async (tag: string) => {
  const mismatchPercentage = await ProductsPage.compareScreenWithBaseline(tag);
  expect(mismatchPercentage).toBeLessThanOrEqual(MISMATCH_TOLERANCE_PERCENT);
});
