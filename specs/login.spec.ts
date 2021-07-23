import { browser } from "protractor";
import { ClickdocCommonPage } from "../pages/ClickdocCommonPage";
import { ClickdocPopupPage } from "../pages/ClickdocPopupPage";
import { ClickdocLoginPage } from "../pages/ClickdocLoginPage";

declare const allure: any;

//imports
const commonPage = new ClickdocCommonPage();
const popupPage = new ClickdocPopupPage();
const loginPage = new ClickdocLoginPage();

import loginData from "../test-data/loginData.json";

describe("Clickdoc - Login", () => {
  beforeAll(async () => {
    await browser.manage().window().maximize();
    await browser.manage().timeouts().implicitlyWait(1000);
  });
  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get("https://demo.clickdoc.de/cd-de/");
    await browser.manage().timeouts().implicitlyWait(1000);
  });

  it("00 - Accept Cookies", async () => {
    await allure.createStep("Accept cookies", async () => {
      await popupPage.checkPopupTitle("Cookie-Einstellungen");
      await popupPage.clickPopupButtonByText("Alle akzeptieren");
    })();
  });

  it("01 - Validate Login Form", async () => {
    await allure.createStep("Validate Login Form", async () => {
      await commonPage.isUserLoggedIn(false);
      await commonPage.clickTopMenuByText("Profil");
      await loginPage.closeButtonIsDisplayed(true);
      await loginPage.switchToLoginFrame();
      await loginPage.inputFieldIsDisplayed("E-Mail-Adresse", true);
      await loginPage.inputFieldIsDisplayed("Passwort", true);
      await loginPage.forgotPasswordLinkIsDisplayed(true);
      await loginPage.buttonIsDisplayed("Anmelden", true);
      await loginPage.buttonIsDisplayed("CGM LIFE ID erstellen", true);
      await attachScreenshot("validateLoginForm");
    })();
  });

  it("02 - Wrong Login Data", async () => {
    await allure.createStep("Submit without data", async () => {
      await commonPage.isUserLoggedIn(false);
      await commonPage.clickTopMenuByText("Profil");
      await loginPage.switchToLoginFrame();
      await loginPage.clickButtonByText("Anmelden");
      await loginPage.checkInputValidatorText(
        "E-Mail-Adresse",
        "Bitte geben Sie Ihre E-Mail-Adresse ein."
      );
      await loginPage.checkInputValidatorText(
        "Passwort",
        "Bitte geben Sie Ihr Passwort ein."
      );
      await attachScreenshot("loginWithoutData");
    })();
    await attachScreenshot("loginWithoutData");
    await allure.createStep("Wrong Password", async () => {
      await loginPage.login(
        loginData.wrongPassword.email,
        loginData.wrongPassword.password
      );
      await loginPage.checkErrorMessagteText(
        "Bitte überprüfen Sie Ihre Eingaben und probieren Sie es erneut. Haben Sie noch keine CGM LIFE ID?"
      );
      await attachScreenshot("loginWrongPassword");
    })();
    await allure.createStep("Wrong email", async () => {
      await loginPage.login(
        loginData.wrongEmail.email,
        loginData.wrongEmail.password
      );
      await loginPage.checkErrorMessagteText(
        "Bitte überprüfen Sie Ihre Eingaben und probieren Sie es erneut. Haben Sie noch keine CGM LIFE ID?"
      );
      await attachScreenshot("loginWrongEmail");
    })();
  });

  it("03 - HappyPath", async () => {
    await allure.createStep("Successful Login", async () => {
      await commonPage.isUserLoggedIn(false);
      await commonPage.clickTopMenuByText("Profil");
      await loginPage.switchToLoginFrame();
      await loginPage.login(
        loginData.correctLogin.email,
        loginData.correctLogin.password
      );
      await commonPage.isUserLoggedIn(true);
      await attachScreenshot("successfulLogin");
    })();
    await allure.createStep("Logout", async () => {
      await commonPage.clickTopMenuAvatar();
      await commonPage.profileButtonByTextIsDisplayed("Mein Profil", true);
      await commonPage.profileButtonByTextIsDisplayed("Logout", true);
      await commonPage.clickProfileButtonByText("Logout");
      await attachScreenshot("logout");
    })();
  });
});

async function attachScreenshot(filename: string) {
  let png = await browser.takeScreenshot();
  await allure.createAttachment(filename, new Buffer(png, "base64"));
}