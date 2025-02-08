import { test, expect } from '@playwright/test';
import { openMRSPages } from '../pages/openmrc.page';

  async function loginToMRSPages(page, username: any, password: any, openMRSPage){
  // Login
  await page.goto('https://o3.openmrs.org/');
  await openMRSPage.usernameField.click();
  await openMRSPage.usernameField.fill(username);
  await openMRSPage.usernameField.press('Enter');
  await expect(openMRSPage.passwordField).toBeVisible();
  await openMRSPage.passwordField.fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  // Verify Cardboard
  await expect(openMRSPage.homeTitle).toBeVisible( { timeout: 60000 } );

}

test('TCID-HP-0001 - Verify in the home page should appear "Active Visit", "Total VIsit", "Scheduled For Today" counter is correct', async ({ page }) => {
  const openMRSPage = new openMRSPages(page);
  // Login
  await loginToMRSPages(page, 'admin', 'Admin123' , openMRSPage);

  // Verify Cardboard
  await expect(openMRSPage.homeTitle).toBeVisible();
  await expect(openMRSPage.activeVisitsTitle).toBeVisible();
  await expect(openMRSPage.totalVisitsToday).toBeVisible();
  await expect(openMRSPage.scheduledForToday).toBeVisible();
});

test('TCID-HP-0002 - User should be able to search name of patient in Active Visit Table', async ({ page }) => {
  const openMRSPage = new openMRSPages(page);

  // Login
  await loginToMRSPages(page, 'admin', 'Admin123' , openMRSPage);

  // Verify Cardboard
  await expect(openMRSPage.homeTitle).toBeVisible();
  await expect(openMRSPage.activeVisitsTitle).toBeVisible();
  await expect(openMRSPage.totalVisitsToday).toBeVisible();
  await expect(openMRSPage.scheduledForToday).toBeVisible();

  // Search Patient name
  await openMRSPage.searchField.nth(0).fill('Barbara Miller');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  await expect(page.getByText("Barbara Miller")).toBeVisible();
});

test('User should be able to open Patient List Menu & User should be able to Create New Patient List', async ({ page }) => {
  const openMRSPage = new openMRSPages(page);

  // Login
  await loginToMRSPages(page, 'admin', 'Admin123' , openMRSPage);

  // Verify Cardboard
  await expect(openMRSPage.homeTitle).toBeVisible();
  await expect(openMRSPage.activeVisitsTitle).toBeVisible();
  await expect(openMRSPage.totalVisitsToday).toBeVisible();
  await expect(openMRSPage.scheduledForToday).toBeVisible();

  // Go to Patient list
  await openMRSPage.patientListsMenuButton.click();
  await expect(openMRSPage.PatientListTitle).toBeVisible();
  await expect(openMRSPage.newListButton).toBeVisible();

  // Create a new data
  await openMRSPage.newListButton.click();
  await openMRSPage.nameField.fill('Test Data 123');
  await openMRSPage.descriptionField.fill('Test List Description');
  await openMRSPage.saveButton.click();
  await page.waitForTimeout(1000);
  await page.getByText("All lists").nth(0).click();
  await expect(page.getByText("Test Data 123")).toBeVisible();
});