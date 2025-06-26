import { Page , expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchProduct(productName: string) {
    await this.page.fill('#twotabsearchtextbox', productName);
    await this.page.click('input[type="submit"]');
  }

  async verifySearchResultsVisible() {
    await expect(this.page.locator('div.s-main-slot')).toBeVisible();
  }

  async selectFirstProduct() {
    await this.page.locator('div.s-main-slot div[data-component-type="s-search-result"]').first().click();
  }
}