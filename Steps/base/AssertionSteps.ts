import { element, ElementFinder } from "protractor";
import { BaseSteps } from "./BaseSteps";

export class AssertionSteps extends BaseSteps {
  
  public async assertTextEquals(element: ElementFinder, textExpected: string) {
    await this.isElementVisible(element);
    let textActual = await element.getText();
    console.log("Check if '" + textActual + "' equals '" + textExpected + "'");
    expect(textActual).toEqual(textExpected);
  }

  public async assertTextContains(element: ElementFinder, textExpected: string) {
    await this.isElementVisible(element);
    let textActual = await element.getText();
    console.log("Check if '" + textActual + "' contains '" + textExpected + "'");
    expect(textActual).toContain(textExpected);
  }

  public async assertElementDisplayed(element: ElementFinder, elementDisplayedExpected: boolean) {
    await this.isElementVisible(element);
    let elementDisplayedActual = await element.isDisplayed();
    expect(elementDisplayedActual).toBe(elementDisplayedExpected);
  }

  public async assertTrue(booleanToCheck: boolean, booleanExpected: boolean) {
    expect(booleanToCheck).toBe(booleanExpected);
  }
}
