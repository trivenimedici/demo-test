import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";

When(/^User clicks on "([^"]*)"$/, (linkname) => {
  cy.waitUntil(() => cy.contains(linkname).should("exist"));
  cy.contains(linkname).click({ force: true });
});
