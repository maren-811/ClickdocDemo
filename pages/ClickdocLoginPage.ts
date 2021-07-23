import { browser, by, element } from "protractor";
import { ClickdocCommonPage } from "./ClickdocCommonPage";

export class ClickdocLoginPage extends ClickdocCommonPage {
  // content
  private loginFrame = element(by.xpath("//iframe[@id='iframeDialog']"));
  private closeLoginFrameButton = element(
    by.xpath("//span[@class='iframe-dialog-close icon icon-CO_close']")
  );
  private inputFieldByName(inputField: string) {
    // mögliche Werte: E-Mail-Adresse, Passwort
    return element(
      by.xpath("//app-login//input[@data-placeholder='" + inputField + "']")
    );
  }
  private inputFieldValidatorByName(inputField: string) {
    // mögliche Werte: E-Mail-Adresse, Passwort
    return element(
      by.xpath(
        "//app-login//input[@data-placeholder='" +
          inputField +
          "']/../../../div/div/mat-error[@role='alert']"
      )
    );
  }
  private forgotPasswordLink = element(
    by.xpath("//app-login//a[contains(text(),'Passwort vergessen?')]")
  );
  private buttonByText(buttonText: string) {
    return element(
      by.xpath("//app-login//button[contains(text(),'" + buttonText + "')]")
    );
  }
  private errorMessage = element(
    by.xpath("//app-login//app-error-message/div/div/p")
  );

  // methods
  public async login(email: string, password: string) {
    await this.actionSteps.value(
      this.inputFieldByName("E-Mail-Adresse"),
      email
    );
    await this.actionSteps.value(this.inputFieldByName("Passwort"), password);
    await this.clickButtonByText("Anmelden");
    await browser.sleep(10000);
  }

  public async inputFieldIsDisplayed(
    inputFieldName: string,
    isDisplayed: boolean
  ) {
    let inputField = await this.inputFieldByName(inputFieldName);
    await this.assertionSteps.assertElementDisplayed(inputField, isDisplayed);
  }

  public async buttonIsDisplayed(buttonText: string, isDisplayed: boolean) {
    let button = await this.buttonByText(buttonText);
    await this.assertionSteps.assertElementDisplayed(button, isDisplayed);
  }

  public async closeButtonIsDisplayed(isDisplayed: boolean) {
    await this.assertionSteps.assertElementDisplayed(
      this.closeLoginFrameButton,
      isDisplayed
    );
  }

  public async forgotPasswordLinkIsDisplayed(isDisplayed: boolean) {
    await this.assertionSteps.assertElementDisplayed(
      this.forgotPasswordLink,
      isDisplayed
    );
  }

  public async checkInputValidatorText(
    inputFieldName: string,
    textExpected: string
  ) {
    let inputFieldValidator = await this.inputFieldValidatorByName(
      inputFieldName
    );
    await this.assertionSteps.assertTextEquals(
      inputFieldValidator,
      textExpected
    );
  }

  public async checkErrorMessagteText(textExpected: string) {
    await this.assertionSteps.assertTextEquals(this.errorMessage, textExpected);
  }

  public async clickButtonByText(buttonText) {
    await this.actionSteps.click(this.buttonByText(buttonText));
  }

  public async switchToLoginFrame() {
    await this.baseSteps.switchToFrame(this.loginFrame);
  }
}
