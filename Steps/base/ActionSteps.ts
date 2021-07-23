import { browser, ElementFinder } from "protractor";
import { BaseSteps } from "./BaseSteps";

export class ActionSteps extends BaseSteps {
  /**
   * @description Performs a single click action on an element if it's clickable
   * @param element - The element to be clicked
   */
  public async click(element: ElementFinder) {
    await this.isElementInDOM(element);
    await this.isElementClickable(element);
    await element.click();
  }

  /**
   * @description Fills an element with text if it's visible. Deletes its' current value.
   * @param element - The element to be filled with text (i.e. an input field)
   * @param value - The text the element is filled with
   */
  public async value(element: ElementFinder, value: string) {
    await this.isElementVisible(element);
    await element.clear();
    await element.sendKeys(value);
  }

  /**
   * Scrolls to the bottom of the current page.
   */
  public async scrollToPageBottom() {
    await browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
  }

   /**
   * Scrolls to the top of the current page.
   */
    public async scrollToPageTop() {
      await browser.executeScript('window.scrollTo(0, 0)');
    }
}
