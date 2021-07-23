import { browser, by, element } from "protractor";
import { convertCompilerOptionsFromJson } from "typescript";
import { ClickdocCommonPage } from "./ClickdocCommonPage";

export class ClickdocPhysicianSearchPage extends ClickdocCommonPage {
  // content
  private searchSectionInputFieldByName(inputField: string) {
    return element(by.xpath(
        "//div[@class='filter']//input[contains(@placeholder, '" + inputField + "')]"
      ));
  }
  private searchSectionCheckboxByLabel(checkbox: string) {
    return element(by.xpath(
      "//div[@class='filter']//span[contains(text(),'" + checkbox + "')]"
    ));
  }
  private searchSectionDropdownByLabel(dropdown: string) {
    return element(by.xpath(
      "//div[@class='filter']//label[contains(text(), '" + dropdown + "')]/../div/button"
    ));
  }
  private searchSectionButtonByText(buttonText: string) {
    return element(by.xpath(
      "//div[@class='filter']//div/button[contains(text(), '" + buttonText + "')]"
    ));
  }
  private searchSectionSuggestionDropdown(inputField: string) { 
    return element(by.xpath(
       "//div[@class='filter']//input[contains(@placeholder, '" + inputField + "')]/following-sibling::typeahead-container"
     )); 
   }
  private searchSectionSuggestionDropdownResult(inputField: string, index: string) { 
   return element(by.xpath(
      "//div[@class='filter']//input[contains(@placeholder, '" + inputField + "')]/following-sibling::typeahead-container/button[" + index + "]/div/span[@class='dropdown-item-inner']"
    )); 
  }
  private sortSectionRadioByLabel(radiobutton: string) {
    return element(by.xpath(
      "//div[@class='sort']//span[contains(text(), '" + radiobutton + "')]"
    ));
  }
  private sortSectionDistanceSlider = element(by.xpath("//div[@class='sort']//ngx-slider[@angularticsaction='Sort by distance']"));
  private resultSectionText = element(by.xpath("//div[@class='panel default-panel hide-filters']/app-empty-state/div/div/div/span"));
  private resultSectionNames(index: string) {
    return element(by.xpath(
      "//div[@class='panel default-panel hide-filters']/app-contact-card[" + index + "]/div/app-contact-header/div/div/div/h2/a"
    ));
  }
  private resultSectionAvatars(index: string) {
    return element(by.xpath(
      "//div[@class='panel default-panel hide-filters']/app-contact-card[" + index + "]/div/app-contact-header//div[@class='avatar-container']/img"
    ));
  }
  private resultSectionSpecializations(index: string) {
    return element(by.xpath(
      "//div[@class='panel default-panel hide-filters']/app-contact-card[" + index + "]/div/app-contact-header/div/div/div/h3"
    ));
  }
  private resultSectionDetailHeaders(indexContact: string, indexDetail: string) {
    return element(by.xpath(
      "//div[@class='panel default-panel hide-filters']/app-contact-card[" + indexContact + "]/div/div/app-contact-details/div/app-profile-field[" + indexDetail + "]/div/div/h4"
    ));
  }
  private resultSectionDetailValue(indexContact: string, indexDetail: string) {
    return element(by.xpath(
      "//div[@class='panel default-panel hide-filters']/app-contact-card[" + indexContact + "]/div/div/app-contact-details/div/app-profile-field[" + indexDetail + "]/div/div/div/span"
    ));
  }
  private resultSectionContactSlots(indexContact: string) {
    return element(by.xpath(
      "//div[@class='panel default-panel hide-filters']/app-contact-card[" + indexContact + "]//app-contact-slots-details"
    ));
  }
  private moreResultsLink = element(by.xpath("//a[@class='load-more-link']"));

  // methods
  public async searchSectionInputFieldIsDisplayed(inputField: string, isDisplayed: boolean) {
    let input = await this.searchSectionInputFieldByName(inputField);
    await this.assertionSteps.assertElementDisplayed(input, isDisplayed);
  }

  public async fillSearchSectionInputField(inputField: string, value: string) {
    let input = await this.searchSectionInputFieldByName(inputField);
    await this.actionSteps.value(input, value);
  }

  public async clearSearchSectionInputField(inputField: string) {
    let input = await this.searchSectionInputFieldByName(inputField);
    await input.clear();
  }

  public async searchSectionCheckboxIsDisplayed(checkbox: string) {
    let check = await this.searchSectionCheckboxByLabel(checkbox);
    await this.assertionSteps.assertElementDisplayed(check, true);
  }

  public async searchSectionDropdownIsDisplayed(dropdown: string) {
    let drop = await this.searchSectionDropdownByLabel(dropdown);
    await this.baseSteps.isElementInDOM(drop);
  }

  public async clickSectionCheckbox(checkbox: string) {
    await this.baseSteps.isElementInDOM(this.searchSectionCheckboxByLabel(checkbox));
    let check = await this.searchSectionCheckboxByLabel(checkbox);
    await this.actionSteps.click(check);
  }

  public async searchSectionButtonIsDisplayed(buttonText: string, isDisplayed: boolean) {
    let button = await this.searchSectionButtonByText(buttonText);
    await this.assertionSteps.assertElementDisplayed(button, isDisplayed);
  }

  public async clickSearchSectionButton(buttonText: string) {
    let button = await this.searchSectionButtonByText(buttonText);
    await this.actionSteps.click(button);
  }

  public async checkSearchSectionSuggestionDropdownIsDisplayed(inputField: string, isDisplayed: boolean) {
    let dropdown = await this.searchSectionSuggestionDropdown(inputField);
    await this.assertionSteps.assertElementDisplayed(dropdown, isDisplayed);
  }

  public async checkSearchSectionSuggestionDropdownResults(inputField: string, textExpected: string) {
    let index = 1;
    while(await this.searchSectionSuggestionDropdownResult(inputField, index.toString()).isPresent() == true) {
      await this.assertionSteps.assertTextContains(this.searchSectionSuggestionDropdownResult(inputField, index.toString()), textExpected);
      index++;
    }
  }

  public async clickSearchSectionSuggestionDropdownResult(inputField: string, result: string) {
    let index = 1;
    while(await this.searchSectionSuggestionDropdownResult(inputField, index.toString()).isPresent() == true) {
      if (await this.searchSectionSuggestionDropdownResult(inputField, index.toString()).getText() == result) {
        await this.actionSteps.click(this.searchSectionSuggestionDropdownResult(inputField, index.toString()));
        break
      }
      index++;
    }
  }

  public async sortSectionRadiobuttonIsDisplayed(radiobutton: string) {
    let radio = await this.sortSectionRadioByLabel(radiobutton);
    await this.assertionSteps.assertElementDisplayed(radio, true);
  }

  public async clickSectionRadiobutton(radiobutton: string) {
    let radio = await this.sortSectionRadioByLabel(radiobutton);
    await this.actionSteps.click(radio);
  }

  public async sortSectionDistanceRangeSliderIsDisplayed(isDisplayed: boolean) {
    let slider = await this.sortSectionDistanceSlider;
    await this.assertionSteps.assertElementDisplayed(slider, isDisplayed);
  }

  public async checkResultSectionText(textExpected: string) {
    await this.assertionSteps.assertTextEquals(this.resultSectionText, textExpected);
  }

  public async checkResultSectionNames(nameExpected: string) {
    let index = 1;
    while(await this.resultSectionNames(index.toString()).isPresent() == true) {
      await this.assertionSteps.assertTextContains(this.resultSectionNames(index.toString()), nameExpected);
      index++;
    }
  }

  public async checkNumberOfResults(resultsExpected: number) {
    let list = element.all(by.xpath("//div[@class='panel default-panel hide-filters']/app-contact-card"));
    expect(await list.count()).toBe(resultsExpected);
  }  
  
  public async checkResultSectionNameByIndexIsDisplayed(index: number, isDisplayed: boolean) {
    let resultName = await this.resultSectionNames(index.toString());
    await this.assertionSteps.assertElementDisplayed(resultName, isDisplayed);
  }  

  public async checkResultSectionAvatarByIndexIsDisplayed(index: number, isDisplayed: boolean) {
    let resultAvatar = await this.resultSectionAvatars(index.toString());
    await this.assertionSteps.assertElementDisplayed(resultAvatar, isDisplayed);
  }

  public async checkResultSectionSpecializationByIndexIsDisplayed(index: number, isDisplayed: boolean) {
    let specialization = await this.resultSectionSpecializations(index.toString());
    await this.assertionSteps.assertElementDisplayed(specialization, isDisplayed);
  }

  public async checkOneOfResultSectionDetailHeaderIs(indexContact: number, headerExpected: string) {
    let match = false;
    let indexDetail = 1;
    while(await this.resultSectionDetailHeaders(indexContact.toString(), indexDetail.toString()).isPresent() == true) {
      if(await (await this.resultSectionDetailHeaders(indexContact.toString(), indexDetail.toString()).getText()).includes(headerExpected)) {
        match = true
      }
      indexDetail++;
    }
    await this.assertionSteps.assertTrue(match, true);
  }

  public async checkAllResultSectionDetailHeader(headerExpected: string, valueExpected: string) {
    let indexContact = 1;
    while (await this.resultSectionNames(indexContact.toString()).isPresent()) {
      let indexDetail = 1;
      while(await this.resultSectionDetailHeaders(indexContact.toString(), indexDetail.toString()).isPresent() == true) {
        await this.assertionSteps.assertTextContains(this.resultSectionDetailHeaders(indexContact.toString(), indexDetail.toString()), headerExpected);
        await this.assertionSteps.assertTextContains(this.resultSectionDetailHeaders(indexContact.toString(), indexDetail.toString()), valueExpected);
        indexDetail++;
      }
      indexContact++;
    }
  }

  public async checkResultsAreOnlineBookable() {
    let index = 1;
    while(await this.resultSectionContactSlots(index.toString()).isPresent() == true) {
      await this.assertionSteps.assertElementDisplayed(this.resultSectionContactSlots(index.toString()), true);
      index++;
    }
  }

  public async checkResultSectionNamesSorted() {
    let index = 1;
    let namesList = [];
    while(await this.resultSectionNames(index.toString()).isPresent() == true) {
      // Annahme: Nachname ist letztes Wort des Namens
      let fullName = await this.resultSectionNames(index.toString()).getText();
      let fullNameSplitted = fullName.split(" ");
      await namesList.push(fullNameSplitted[fullNameSplitted.length-1]);
      index++;
    }
    console.log("Last Names of the Physicians: " + namesList);
    let namesListSorted = namesList;
    expect(namesList).toEqual(namesListSorted)
  }

  public async clickMoreResultsLink() {
    let link = await this.moreResultsLink;
    await this.actionSteps.click(link);
    await browser.sleep(3000);
  }
}

