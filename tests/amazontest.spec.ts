    
    
import { test, expect } from '@playwright/test';


//Feature: Navigation vers Amazon.fr

  //Scenario: L'utilisateur accède à la page d'accueil de Amazon.fr

  //  Given l'utilisateur ouvre le navigateur
  //  When il navigue vers "https://www.amazon.fr"
  //  Then l'URL actuelle doit contenir "amazon.fr"
  //  And le logo Amazon doit être visible sur la page
  
    

test('accès à la page de Amazon.fr', async ({ page }) => {
  await page.goto('https://www.amazon.fr');
  expect(page.url()).toContain('amazon.fr');
  await expect(page.locator('div[id="nav-logo"]')).toBeVisible()// Sélecteur mis à jour pour le logo
  
})  

// Feature: Accepter les cookies sur Amazon.fr

  //Scenario: L'utilisateur accepte les cookies après avoir accédé au site
  // Given l'utilisateur ouvre le navigateur
 // When il navigue vers "https://www.amazon.fr"
  //And il clique sur le bouton "Accepter" des cookies
  // Then le bouton "Accepter" ne doit plus être visible  


test('Refuser les cookies', async ({ page }) => {
    await page.goto('https://www.amazon.fr');
    const refuseCookiesButton = page.locator('#sp-cc-rejectall-link');
    await refuseCookiesButton.click();
    const cookieBanner = page.locator('#sp-cc-banner');
    await expect(cookieBanner).toBeHidden();
 });

// Feature: Recherche d'un produit sur Amazon.fr

  //  Scenario: L'utilisateur effectue une recherche de produit
  //  Given l'utilisateur est sur la page d'accueil de "https://www.amazon.fr"
  //  And il accepte les cookies si nécessaire
  //  When il saisit "clavier mécanique" dans la barre de recherche
  //  And il clique sur le bouton de recherche
  //  Then les résultats de recherche doivent s'afficher
 
  test('Recherche d\'un produit sur Amazon.fr', async ({ page }) => {
    await page.goto('https://www.amazon.fr');
    
    const acceptCookiesButton = page.locator('#sp-cc-accept');
    if (await acceptCookiesButton.isVisible()) {
        await acceptCookiesButton.click();
    }

    await page.fill('#twotabsearchtextbox', 'clavier mécanique');
    await page.click('input[type="submit"]');

    await expect(page.locator('div.s-main-slot')).toBeVisible();
});

// Feature: Sélection d’un produit dans les résultats

  // Scenario: L'utilisateur sélectionne le premier produit dans les résultats
  //  Given l'utilisateur a recherché "clavier mécanique" sur Amazon.fr
  //    When il clique sur le premier produit dans la liste
  //    Then la page du produit doit s'afficher avec le titre du produit visible  

  test('Sélection du premier produit dans les résultats', async ({ page }) => {
    await page.goto('https://www.amazon.fr');

    await page.locator('#sp-cc-accept').click();

    await page.fill('#twotabsearchtextbox', 'clavier mécanique');
    await page.click('input[type="submit"]');

    await page.locator('div.s-main-slot div[data-component-type="s-search-result"]').first().click();

    await expect(page.locator('#productTitle')).toBeVisible();
});

//  Feature: Ajouter un produit au panier

  // Scenario: L'utilisateur ajoute un produit au panier
  //  Given l'utilisateur est sur la page d’un produit
  //  When il clique sur le bouton "Ajouter au panier"
  // Then un message de confirmation d’ajout au panier doit s'afficher      

  test('Ajouter un produit au panier', async ({ page }) => {
    // Given l'utilisateur est sur la page d’un produit
    await page.goto('https://www.amazon.fr');
    await page.locator('#sp-cc-accept').click(); // Accepter les cookies
    await page.fill('#twotabsearchtextbox', 'clavier mécanique'); // Recherche d'un produit
    await page.click('input[type="submit"]'); // Cliquer sur le bouton de recherche
    await page.locator('div.s-main-slot div[data-component-type="s-search-result"]').first().click(); // Sélectionner le premier produit

    // When il clique sur le bouton "Ajouter au panier"
    await page.locator('input[id="add-to-cart-button"]').click(); // Bouton "Ajouter au panier"

    
    await expect(page.locator('span[id="sw-subtotal-item-count"]')).toBeVisible(); // Message de confirmation
    
});

//  Feature: Vérification du panier

  // Scenario: L'utilisateur accède au panier après avoir ajouté un produit
  // Given un produit a été ajouté au panier
  // When l'utilisateur clique sur le lien "Panier"
  // Then le produit doit apparaître dans la liste du panier


  test('Vérification du panier', async ({ page }) => {
    // Given un produit a été ajouté au panier
    await page.goto('https://www.amazon.fr');
    await page.locator('#sp-cc-accept').click(); // Accepter les cookies
    await page.fill('#twotabsearchtextbox', 'clavier mécanique'); // Recherche d'un produit
    await page.click('input[type="submit"]'); // Cliquer sur le bouton de recherche
    await page.locator('div.s-main-slot div[data-component-type="s-search-result"]').first().click(); // Sélectionner le premier produit
    await page.locator('input[id="add-to-cart-button"]').click(); // Ajouter au panier

    await page.locator('#nav-cart').click(); // Cliquer sur le lien "Panier"

    const cartItem = page.locator('.sc-list-item'); // Sélecteur pour les produits dans le panier
    await expect(cartItem).toBeVisible();
});

// Feature: Suppression d’un article du panier sur Amazon.fr

 // Scenario: L'utilisateur supprime un article de son panier
 //   Given un produit a été ajouté au panier
 //   And l'utilisateur est sur la page du panier
 //   When il clique sur "Supprimer" ou "Supprimer l'article" pour cet article
 //   Then l'article ne doit plus apparaître dans la liste du panier
 //   And le message "Votre panier est vide" doit s'afficher si aucun autre article n’est présent


test('Suppression d’un article du panier', async ({ page }) => {
    // Given un produit a été ajouté au panier
    await page.goto('https://www.amazon.fr');
    await page.locator('#sp-cc-accept').click(); // Accepter les cookies
    await page.fill('#twotabsearchtextbox', 'clavier mécanique'); // Recherche d'un produit
    await page.click('input[type="submit"]'); // Cliquer sur le bouton de recherche
    await page.locator('div.s-main-slot div[data-component-type="s-search-result"]').first().click(); // Sélectionner le premier produit
    await page.locator('input[id="add-to-cart-button"]').click(); // Ajouter au panier

    // And l'utilisateur est sur la page du panier
    await page.locator('#nav-cart').click(); // Cliquer sur le lien "Panier"

    // When il clique sur "Supprimer" ou "Supprimer l'article" pour cet article
    await page.locator('input[value="Supprimer"],input[data-action="delete-active"]').click(); // Bouton "Supprimer"

    // And le message "Votre panier est vide" doit s'afficher si aucun autre article n’est présent
    //await expect(page.locator('h2#sc-active-items-header')).toHaveText('Votre panier')
    
});

// Feature: Tri des résultats
    // Scenario: Trier les résultats par prix croissant
    //     Given Je recherche un produit
    //     When Je trie les résultats par "prix croissant"
    //     Then Les résultats doivent être triés correctement
test('Trier les résultats par prix croissant', async ({ page }) => {
    await page.goto('https://www.amazon.fr');
    const searchInput = page.locator('#twotabsearchtextbox');
    await searchInput.fill('ordinateur portable');
    await searchInput.press('Enter');
 
    const sortDropdown = page.locator('#s-result-sort-select');
    await sortDropdown.selectOption({ value: 'price-asc-rank' });
 
        // Attendre que l'option sélectionnée soit visible
    const selectedOption = page.locator('#s-result-sort-select option:checked');
 
        // Vérifier que l'attribut tabindex est défini correctement
     await expect(selectedOption).toHaveAttribute('value', 'price-asc-rank');
});
 
//  Feature: Lancer le processus de commande

  // Scenario: L'utilisateur tente de passer commande sans être connecté
  // Given un produit est présent dans le panier
  // When l'utilisateur clique sur le bouton "Passer la commande"
  // Then l'utilisateur doit être redirigé vers la page de connexion          

  test('Lancer le processus de commande sans être connecté', async ({ page }) => {
    // Given un produit est présent dans le panier
    await page.goto('https://www.amazon.fr');
    await page.locator('#sp-cc-accept').click(); // Accepter les cookies
    await page.fill('#twotabsearchtextbox', 'clavier mécanique'); // Recherche d'un produit
    await page.click('input[type="submit"]'); // Cliquer sur le bouton de recherche
    await page.locator('div.s-main-slot div[data-component-type="s-search-result"]').first().click(); // Sélectionner le premier produit
    await page.locator('input[id="add-to-cart-button"]').click(); // Ajouter au panier

    // When l'utilisateur clique sur le bouton "Passer la commande"
    await page.locator('input[name="proceedToRetailCheckout"]').click(); // Bouton "Passer la commande"

    // Then l'utilisateur doit être redirigé vers la page de connexion
    await expect(page).toHaveURL(/.*signin.*/); // Vérifier que l'URL contient "signin"
});
