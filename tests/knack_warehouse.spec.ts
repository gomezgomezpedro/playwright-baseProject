import { test, expect } from "@playwright/test";
import { color } from "pengrape";
import { WarehouseLoginPage } from "../pages/warehouse-loginPage";
import { WarehouseMainPage } from "../pages/warehouse-mainPage";
import { WarehouseLiveAppPage } from "../pages/warehouse-liveAppPage";

/**
 * TC_001 - Icon Color for Display Rules
 * 1. Randomize the color for a Display Rule warning symbol icon.
 * 2. Validate that the warning symbol icon has the correct color in the Live App.
 */
test("Icon Color for Display Rules", async ({ context }) => {
  const page = await context.newPage();
  const warehouseLoginPage = new WarehouseLoginPage(page);
  const warehouseMainPage = new WarehouseMainPage(page);
  // 1. Navigate to the Knack Builder login url for your app.
  await warehouseLoginPage.goto();
  // 2. Login.
  await warehouseLoginPage.login(USER_EMAIL, USER_PASSWORD);
  // 3. Click on the Pages Tab.
  await warehouseMainPage.pagesTab.click();
  // 4. Click on the 'Admin > Inventory' page in the left nav.
  await warehouseMainPage.adminInventoryPage.click();
  // 5. Click on the `Inventory` page in the left nav.
  await warehouseMainPage.inventoryPage.click();
  // 6. Click to activate the `Warehouse Inventory` View.
  // 7. Click on the On-Hand column header to open the column properties for that column.
  await warehouseMainPage.editTableView.click();
  await warehouseMainPage.onHandColumnHeader.click();
  // 8. Under Display Rules, validate that a display rule exists that sets an icon.
  await expect.soft(warehouseMainPage.iconSelector).toBeHidden();
  // 9. Use pengrape to generate a random color.
  const randomColor = color({ format: "hex" });
  // 10. Update the Display Rule Icon color to this random color.
  await warehouseMainPage.iconColorInput.clear();
  await warehouseMainPage.iconColorInput.fill(randomColor);
  // 11. Click `Save Changes` in the left nav.
  await warehouseMainPage.saveChangesButton.click();
  // 12. Go to the Live App (there is a link to the Live App in the top header).
  const warehouseLiveAppLoginPage = new WarehouseLoginPage(
    await warehouseMainPage.accessLiveApp()
  );
  // 13. Login as the admin (username: admin@test.com) (password: test).
  await warehouseLiveAppLoginPage.loginLiveApp(ADMIN_EMAIL, ADMIN_PASSWORD);
  // 14. Navigate to the Inventory tab.
  const warehouseLiveAppPage = new WarehouseLiveAppPage(
    warehouseLiveAppLoginPage.page
  );
  await warehouseLiveAppPage.inventoryTab.click();
  // 15. Validate that the icon next to On-Hand values of 0 is set to the new color that was defined in Step 9.
  const cssRandomColor = WarehouseLiveAppPage.hexToRgb(randomColor);
  await expect(warehouseLiveAppPage.warningIcon).toHaveCSS(
    "color",
    cssRandomColor
  );
});

/**
 * TC_002 - Filtering inventory
 * 1. Filter records in the Inventory object where "Needs Re-Order" is Yes, count the records, and confirm their value.
 * 2. Validate that a Table displaying these same records in the Live App properly filters in the same way with the same results.
 */
test("Filtering inventory", async ({ context }) => {
  const page = await context.newPage();
  const warehouseLoginPage = new WarehouseLoginPage(page);
  const warehouseMainPage = new WarehouseMainPage(page);
  // 1. Navigate to the Knack Builder login url for your app.
  await warehouseLoginPage.goto();
  // 2. Login.
  await warehouseLoginPage.login(USER_EMAIL, USER_PASSWORD);
  // 3. Click on the Records Tab.
  await warehouseMainPage.recordsTab.click();
  // 4. Click on the `Warehouse Inventory` Object in the left nav.
  await warehouseMainPage.warehouseInventoryObject.click();
  // 5. Click on the “Add filters” button.
  await warehouseMainPage.addFiltersButton.click();
  // 6. Filter on “Needs Re-Order” “is” “Yes” and then click Submit.
  await warehouseMainPage.editFilters("Needs Re-Order", "is", "Yes");
  await warehouseMainPage.submitFiltersButton.click();
  // 7. Validate that EVERY “Needs Re-Order” table cell is set to “Yes”.
  //TODO
  // 8. Count and store the number of records displayed in the table.
  //TODO
  // 9. Go to the Live App (there is a link to the Live App in the top header).
  const warehouseLiveAppLoginPage = new WarehouseLoginPage(
    await warehouseMainPage.accessLiveApp()
  );
  // 10. Login as the admin (username: admin@test.com) (password: test).
  await warehouseLiveAppLoginPage.loginLiveApp(ADMIN_EMAIL, ADMIN_PASSWORD);
  // 11. Navigate to the Inventory tab.
  const warehouseLiveAppPage = new WarehouseLiveAppPage(
    warehouseLiveAppLoginPage.page
  );
  await warehouseLiveAppPage.inventoryTab.click();
  // 12. Click on the “Add filters” button.
  //TODO
  // 13. Filter on “Needs Re-Order” “is” “Yes” and then click Submit.
  //TODO
  // 14. Validate that EVERY “Needs Re-Order” table cell is set to “Yes”.
  //TODO
  // 15. Validate that the number of records matches the number of records shown in the builder Records Tab (the number from step 6).
  //TODO
});
