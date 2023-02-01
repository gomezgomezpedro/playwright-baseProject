import { Locator, Page } from "@playwright/test";

export class WarehouseLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passInput: Locator;
  readonly signInButton: Locator;
  readonly emailLiveAppInput: Locator;
  readonly passLiveAppInput: Locator;
  readonly signInLiveAppButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passInput = page.locator("#password >> nth=1");
    this.signInButton = page.locator('input[type="submit"] >> nth=1');
    this.emailInput = page.locator("#email >> nth=1");
    this.emailLiveAppInput = page.locator("#email");
    this.passLiveAppInput = page.locator("#password");
    this.signInLiveAppButton = page.locator(
      "xpath=(//input[@value='Sign In'])[1]"
    );
  }

  async goto() {
    await this.page.goto(
      "https://builder.knack.com/pgomezcuadrado/warehouse-manager/"
    );
  }

  async login(email, password) {
    //Input email
    await this.emailInput.type(email);
    //Input email
    await this.passInput.type(password);
    //Click Sign In button
    await this.signInButton.click();
  }

  async loginLiveApp(email, password) {
    //Input email
    await this.emailLiveAppInput.type(email);
    //Input email
    await this.passLiveAppInput.type(password);
    //Click Sign In button
    await this.signInLiveAppButton.click();
  }
}
