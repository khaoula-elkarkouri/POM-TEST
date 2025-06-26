import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto('https://www.amazon.fr');
  }

  async acceptCookies() {
    const acceptCookiesButton = this.page.locator('#sp-cc-accept');
    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
    }
  }

  async verifyLogoVisible() {
    await expect(this.page.locator('div[id="nav-logo"]')).toBeVisible();
  }
}