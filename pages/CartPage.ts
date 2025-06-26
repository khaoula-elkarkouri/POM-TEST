import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCart() {
    await this.page.locator('#nav-cart').click();
  }

  async verifyCartItemVisible() {
    await expect(this.page.locator('.sc-list-item')).toBeVisible();
  }

  async removeItemFromCart() {
    await this.page.locator('input[value="Supprimer"],input[data-action="delete-active"]').click();
  }

  async verifyEmptyCartMessage() {
    const emptyCartMessage = this.page.locator('h2#sc-active-items-header');
    await expect(emptyCartMessage).toHaveText('Votre panier');
  }
}