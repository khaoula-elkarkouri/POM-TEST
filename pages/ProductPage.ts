import { Page, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart() {
    await this.page.locator('input[id="add-to-cart-button"]').click();
  }

  async verifyProductTitleVisible() {
    await expect(this.page.locator('#productTitle')).toBeVisible();
  }
}