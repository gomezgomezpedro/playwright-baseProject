import { Locator, Page } from "@playwright/test";

export class WarehouseLiveAppPage {
  readonly page: Page;
  readonly inventoryTab: Locator;
  readonly warningIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryTab = page.locator(
      "xpath=(//a[@data-kn-slug='#inventory2'])[1]"
    );
    this.warningIcon = page.locator("xpath=(//i[@class='fa fa-warning'])[1]");
  }

  static hexToRgb(hex: string): string {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )})`
      : "";
  }
}
