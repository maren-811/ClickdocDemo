import { browser, by, element, ElementFinder, WebElement } from "protractor";
import { ClickdocCommonPage } from "./ClickdocCommonPage";

export class ClickdocPopupPage extends ClickdocCommonPage {
  // content
  private popupTitle = element(
    by.xpath("//div[@class='modal-content']//h4[@class='modal-title']")
  );
  private buttonByText(buttonText: string) {
    return element(
      by.xpath(
        "//div[@class='modal-content']//div[@class='modal-footer']//button[contains(text(),'" +
          buttonText +
          "')]"
      )
    );
  }

  //methods
  public async checkPopupTitle(popupTitleExpected: string) {
    await this.assertionSteps.assertTextEquals(
      this.popupTitle,
      popupTitleExpected
    );
  }

  public async clickPopupButtonByText(popupButtonText: string) {
    let button = await this.buttonByText(popupButtonText);
    await this.actionSteps.click(button);
  }
}
