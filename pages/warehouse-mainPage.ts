import { Locator, Page } from "@playwright/test";

export class WarehouseMainPage {
  readonly page: Page;
  readonly recordsTab: Locator;
  readonly pagesTab: Locator;
  readonly adminInventoryPage: Locator;
  readonly inventoryPage: Locator;
  readonly editTableView: Locator;
  readonly onHandColumnHeader: Locator;
  readonly iconSelector: Locator;
  readonly iconColorInput: Locator;
  readonly saveChangesButton: Locator;
  readonly goLiveAppLink: Locator;
  readonly warehouseInventoryObject: Locator;
  readonly addFiltersButton: Locator;
  readonly filterSelectProduct: Locator;
  readonly filterSelectOperator: Locator;
  readonly filterMultiselect: Locator;
  readonly submitFiltersButton: Locator;
  readonly needsReorderCell: Locator;
  waitForEvent: Promise<Page>;

  constructor(page: Page) {
    this.page = page;
    this.recordsTab = page.locator("xpath=//a[@data-cy='nav-records']");
    this.pagesTab = page.locator("xpath=//a[@data-cy='nav-pages']");
    this.adminInventoryPage = page.getByText("Admin > Inventory");
    this.inventoryPage = page.locator("xpath=//div[@data-cy='Inventory']");
    this.editTableView = page.locator(
      "xpath=//div[@content='Click to edit this view']"
    );
    this.onHandColumnHeader = page.locator(
      "xpath=(//div[@content='Click to edit, drag to move'])[7]"
    );
    this.iconSelector = page.locator("selected-icon");
    this.iconColorInput = page.locator(
      "//input[@class='kn-input kn-colorInput_input']"
    );
    this.saveChangesButton = page.getByText(" save changes ");
    this.goLiveAppLink = page.locator("//a[@class='accessMenu_directLink']");
    this.warehouseInventoryObject = page.getByText("Warehouse Inventory");
    this.addFiltersButton = page.locator("xpath=//a[@data-cy='add-filters']");
    this.filterSelectProduct = page.locator(
      "xpath=//select[@data-cy='field-list-field']"
    );
    this.filterSelectOperator = page.locator(
      "xpath=//select[@data-cy='field-list-operator']"
    );
    this.filterMultiselect = page.locator("#listbox-null");
    this.submitFiltersButton = page.locator(
      "xpath=//button[@data-cy='save-filters']"
    );
    this.needsReorderCell = page.locator(
      "xpath=//td[@data-cy='table-cell-field_142']"
    );
    this.waitForEvent = page.waitForEvent("popup");
  }

  async accessLiveApp() {
    const newPagePromise = new Promise((resolve) =>
      this.page.once("popup", resolve)
    );
    await Promise.all([this.goLiveAppLink.click(), newPagePromise]);
    return (await this.page.context().pages())[1];
  }

  async editFilters(product, operator, tag) {
    await this.filterSelectProduct.selectOption(product);
    await this.filterSelectOperator.selectOption(operator);
    await this.filterMultiselect.selectOption(tag);
  }
}
