import {
  browser,
  ElementFinder,
  ProtractorExpectedConditions,
} from "protractor";

export class BaseSteps {
  private ec: ProtractorExpectedConditions = browser.ExpectedConditions;
  private timeOutEc = 30000;

  public async isElementVisible(element: ElementFinder) {
    await browser.wait(
      this.ec.visibilityOf(element),
      this.timeOutEc,
      "Error: Element is not visible"
    );
  }

  public async isElementClickable(element: ElementFinder) {
    browser.wait(
      await this.ec.elementToBeClickable(element),
      this.timeOutEc,
      "Error: Element is not clickable"
    );
  }

  public async isElementNotInDOM(element: ElementFinder) {
    browser.wait(
      await this.ec.stalenessOf(element),
      this.timeOutEc,
      "Error: Element is present"
    );
  }

  public async isElementInDOM(element: ElementFinder) {
    browser.wait(
      await this.ec.presenceOf(element),
      this.timeOutEc,
      "Error: Element is not present"
    );
  }

  public async switchToFrame(element: ElementFinder) {
    browser.wait(
      await this.ec.presenceOf(element),
      this.timeOutEc,
      "Error: Element is not present"
    );
    await browser.switchTo().frame(element.getWebElement());
  }

  public async switchToFrameNumber(frameNumber: number) {
    await browser.switchTo().frame(frameNumber);
  }

  public async switchToDefaultContent() {
    await browser.switchTo().defaultContent();
  }
}
