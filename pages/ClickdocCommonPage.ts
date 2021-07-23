import { browser, by, element, ElementFinder } from "protractor";
import { BaseSteps } from "../Steps/base/BaseSteps";
import { ActionSteps } from "../Steps/base/ActionSteps";
import { AssertionSteps } from "../Steps/base/AssertionSteps";

export class ClickdocCommonPage {
  // import basic steps
  public baseSteps = new BaseSteps();
  public assertionSteps = new AssertionSteps();
  public actionSteps = new ActionSteps();

  // page content
  private topMenuButtonByText(topMenu: string) {
    return element(
      by.xpath(
        "//ul[@class='menu-desktop d-lg-block d-md-none d-sm-none ng-tns-c118-0']/li[@routerlinkactive='menu-item-active']/a/span[contains(text(),'" +
          topMenu +
          "')]/parent::a"
      )
    );
  }
  private topMenuAvatarButton = element(
    by.xpath(
      "//ul[@class='menu-desktop d-lg-block d-md-none d-sm-none ng-tns-c118-0']/li/a/app-avatar/div"
    )
  );
  private profileButtonByText(profileButton: string) {
    return element(
      by.xpath(
        "//ul[@class='menu-desktop d-lg-block d-md-none d-sm-none ng-tns-c118-0']/li/a/following-sibling::div//span[contains(text(),'" +
          profileButton +
          "')]/parent::div"
      )
    );
  }

  // methods
  public async isUserLoggedIn(loggedIn: boolean) {
    if (loggedIn) {
      await this.baseSteps.isElementInDOM(this.topMenuAvatarButton);
      await this.assertionSteps.assertElementDisplayed(
        this.topMenuAvatarButton,
        true
      );
    } else {
      await this.baseSteps.isElementInDOM(this.topMenuButtonByText("Profil"));
      await this.topMenuByTextIsDisplayed("Profil", true);
    }
  }

  public async clickTopMenuByText(topMenu: string) {
    await this.actionSteps.click(this.topMenuButtonByText(topMenu));
  }

  public async topMenuByTextIsDisplayed(
    topMenu: string,
    topMenuDisplayedExpected: boolean
  ) {
    await this.assertionSteps.assertElementDisplayed(
      this.topMenuButtonByText(topMenu),
      topMenuDisplayedExpected
    );
  }

  public async clickTopMenuAvatar() {
    await this.baseSteps.isElementInDOM(this.topMenuAvatarButton);
    await this.actionSteps.click(this.topMenuAvatarButton);
  }

  public async clickProfileButtonByText(profileButtonText: string) {
    let button = await this.profileButtonByText(profileButtonText);
    await this.baseSteps.isElementInDOM(button);
    await this.actionSteps.click(button);
  }

  public async profileButtonByTextIsDisplayed(popupButtonText: string, isDisplayed: boolean) {
    let button = await this.profileButtonByText(popupButtonText);
    await this.assertionSteps.assertElementDisplayed(button, isDisplayed);
  }

  public scrollToPageBottom() {
    this.actionSteps.scrollToPageBottom();
  }

  public scrollToPageTop() {
    this.actionSteps.scrollToPageTop();
  }
}
