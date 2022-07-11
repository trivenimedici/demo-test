import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";
import homepage from "../../../support/pageObjects/HomePage";

When(/^User Initial Balance credits are stored$/, () => {
  new homepage().storeUserInitialBalance();
});
