import { browser } from "protractor";
import { ClickdocCommonPage } from "../pages/ClickdocCommonPage";
import { ClickdocPopupPage } from "../pages/ClickdocPopupPage";
import { ClickdocPhysicianSearchPage } from "../pages/ClickdocPhysicianSearchPage";

declare const allure: any;

//imports
const commonPage = new ClickdocCommonPage();
const popupPage = new ClickdocPopupPage();
const physicianSearchPage = new ClickdocPhysicianSearchPage();

describe("Clickdoc - Physician Search", () => {
  beforeAll(async () => {
    await browser.manage().window().maximize();
    await browser.manage().timeouts().implicitlyWait(1000);
  });
  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get("https://demo.clickdoc.de/cd-de/");
    await browser.manage().timeouts().implicitlyWait(1000);
    await popupPage.checkPopupTitle("Cookie-Einstellungen");
    await popupPage.clickPopupButtonByText("Alle akzeptieren");
    await commonPage.isUserLoggedIn(false);
  });

  it("11 - Physician Search", async () => {
    await allure.createStep("Navigate to 'Arztsuche'", async () => {
      await commonPage.clickTopMenuByText("Arztsuche");
    });
    await allure.createStep("Validate form", async () => {
      await physicianSearchPage.searchSectionInputFieldIsDisplayed(
        "Fachbereich, Name des Arztes, Praxis oder Einrichtung",
        true
      );
      await physicianSearchPage.searchSectionInputFieldIsDisplayed(
        "Ort, PLZ oder Stadtteil",
        true
      );
      await physicianSearchPage.searchSectionCheckboxIsDisplayed(
        "Online Termine buchbar"
      );
      await physicianSearchPage.searchSectionCheckboxIsDisplayed(
        "Videosprechstunde"
      );
      await physicianSearchPage.searchSectionCheckboxIsDisplayed(
        "Barrierefreiheit"
      );
      await physicianSearchPage.searchSectionButtonIsDisplayed("Suchen", true);

      await physicianSearchPage.sortSectionRadiobuttonIsDisplayed(
        "Relevanteste Ergebnisse"
      );
      await physicianSearchPage.sortSectionRadiobuttonIsDisplayed(
        "Alphabetisch nach Arztname"
      );
      await physicianSearchPage.sortSectionRadiobuttonIsDisplayed("Entfernung");
      await physicianSearchPage.sortSectionDistanceRangeSliderIsDisplayed(true);

      await physicianSearchPage.checkResultSectionText(
        "AUF DER LINKEN SEITE KÖNNEN SIE DIE ARZTSUCHE STARTEN."
      );
    });

    await allure.createStep("Search for physician", async () => {
      await physicianSearchPage.fillSearchSectionInputField(
        "Name des Arztes",
        "Karl"
      );
      await physicianSearchPage.checkSearchSectionSuggestionDropdownIsDisplayed(
        "Name des Arztes",
        true
      );
      await physicianSearchPage.checkSearchSectionSuggestionDropdownResults(
        "Name des Arztes",
        "Karl"
      );
      await physicianSearchPage.fillSearchSectionInputField(
        "Name des Arztes",
        "Karl Schuhmann"
      );
      await physicianSearchPage.checkSearchSectionSuggestionDropdownIsDisplayed(
        "Name des Arztes",
        true
      );
      await physicianSearchPage.checkSearchSectionSuggestionDropdownResults(
        "Name des Arztes",
        "Karl Schuhmann"
      );
      await physicianSearchPage.fillSearchSectionInputField(
        "Name des Arztes",
        "Karl Schuhmannsen"
      );
      await physicianSearchPage.checkSearchSectionSuggestionDropdownIsDisplayed(
        "Name des Arztes",
        false
      );
      await physicianSearchPage.fillSearchSectionInputField(
        "Name des Arztes",
        "Karl"
      );
      await physicianSearchPage.clickSearchSectionButton("Suchen");
      await physicianSearchPage.checkResultSectionNames("Karl");

      await physicianSearchPage.checkResultSectionNameByIndexIsDisplayed(
        1,
        true
      );
      await physicianSearchPage.checkResultSectionAvatarByIndexIsDisplayed(
        1,
        true
      );
      await physicianSearchPage.checkResultSectionSpecializationByIndexIsDisplayed(
        1,
        true
      );
      await physicianSearchPage.checkOneOfResultSectionDetailHeaderIs(
        1,
        "Adresse"
      );
      await attachScreenshot("successfulSearch");
    })();

    await allure.createStep("Show more results", async () => {
      await commonPage.scrollToPageBottom();
      await physicianSearchPage.checkNumberOfResults(10);
      await physicianSearchPage.clickMoreResultsLink();
      await physicianSearchPage.checkNumberOfResults(20);
    })();

    await allure.createStep("Filtered search", async () => {
      await commonPage.scrollToPageTop();
      await physicianSearchPage.fillSearchSectionInputField("Ort", "56567");
      await physicianSearchPage.checkSearchSectionSuggestionDropdownIsDisplayed(
        "Ort",
        true
      );
      await physicianSearchPage.checkSearchSectionSuggestionDropdownResults(
        "Ort",
        "56567"
      );
      await physicianSearchPage.fillSearchSectionInputField(
        "Ort",
        "56567 Neuwied"
      );
      await physicianSearchPage.checkSearchSectionSuggestionDropdownIsDisplayed(
        "Ort",
        true
      );
      await physicianSearchPage.clickSearchSectionSuggestionDropdownResult(
        "Ort",
        "56567 Neuwied"
      );
      await physicianSearchPage.clickSearchSectionButton("Suchen");

      await physicianSearchPage.clickSectionCheckbox("Online Termine buchbar");
      await physicianSearchPage.searchSectionDropdownIsDisplayed(
        "Bevorzugte Zeit"
      );
      await physicianSearchPage.searchSectionDropdownIsDisplayed("Von");
      await physicianSearchPage.clickSearchSectionButton("Suchen");
      await physicianSearchPage.checkResultsAreOnlineBookable();
      await physicianSearchPage.clickSectionCheckbox("Online Termine buchbar");
      await attachScreenshot("filterForOnlineBooking");

      /*
    await physicianSearchPage.clearSearchSectionInputField("Name des Arztes");
    await physicianSearchPage.clickSectionCheckbox("Videosprechstunde");
    await physicianSearchPage.clickSearchSectionButton("Suchen");
    await physicianSearchPage.checkAllResultSectionDetailHeader("Angebotene Services", "Videosprechstunde");
    await physicianSearchPage.clickSectionCheckbox("Videosprechstunde");
    

    await physicianSearchPage.clickSectionCheckbox("Barrierefreheit");
    await physicianSearchPage.clickSearchSectionButton("Suchen");
    await physicianSearchPage.checkAllResultSectionDetailHeader("Zugangsinformationen", "Barrierefrei");
    */
    })();

    await allure.createStep("Sort results", async () => {
      await physicianSearchPage.clickSectionRadiobutton(
        "Alphabetisch nach Arztname"
      );
      await physicianSearchPage.checkResultSectionNamesSorted();
      await attachScreenshot("checkResultsSorted");
    })();
  });
});

async function attachScreenshot(filename: string) {
  let png = await browser.takeScreenshot();
  await allure.createAttachment(filename, new Buffer(png, "base64"));
}
