import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";
import casinopage from "../../../support/pageObjects/casinoPage";

When(/^User choose the casino game selection as "([^"]*)"$/, (gameToSelect) => {
  new casinopage().choosegamefromDropDown(gameToSelect);
});
When(
  /^User places bet for "([^"]*)" with Stake of "([^"]*)"$/,
  (betName, StakeAmount) => {
    new casinopage().placeBet(betName, StakeAmount);
  }
);
