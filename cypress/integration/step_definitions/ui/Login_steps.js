import {
  After,
  Before,
  Given,
  And,
  Then,
  When,
} from "cypress-cucumber-preprocessor/steps";
import loginpage from "../../../support/pageObjects/LoginPage";

Given(/^User login to the application$/, () => {
  new loginpage().navigatetoApp();
  new loginpage().appSignIn();
});

And(/^User logs Out of the application$/, () => {
  new loginpage().logout();
});
