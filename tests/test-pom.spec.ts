import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Lancer le processus de commande sans être connecté', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Given un produit est présent dans le panier
  await homePage.navigateToHomePage();
  await homePage.acceptCookies();
  await searchPage.searchProduct('clavier mécanique');
  await searchPage.selectFirstProduct();
  await productPage.addToCart();

  // When l'utilisateur clique sur le bouton "Passer la commande"
  await page.locator('input[name="proceedToRetailCheckout"]').click();

  // Then l'utilisateur doit être redirigé vers la page de connexion
  await expect(page).toHaveURL(/.*signin.*/);
});