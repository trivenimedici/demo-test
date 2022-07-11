export default class LoginPage {
  constructor() {
    this.loginLink = ".login-btn";
    this.emailIDTextBox = '[name="username"]';
    this.passwordTextBox = "#standard-adornment-password";
    this.logInButton = ".MuiButton-label";
    this.hypexLogo = ".web-logo";
    this.myProfileIcon = ":nth-child(2) > .MuiSvgIcon-root";
  }
  navigatetoApp() {
    if (Cypress.config("runtime_env") === "prod") {
      cy.visit(Cypress.config("app_prod_url"));
    }
  }

  appSignIn() {
    global.username = Cypress.config("app_prod_username");
    global.password = Cypress.config("app_prod_password");
    cy.waitUntil(() => cy.get(this.hypexLogo).should("be.visible"));
    cy.waitUntil(() => cy.get(this.loginLink).should("be.visible"));
    cy.get(this.loginLink).click();
    cy.waitUntil(() => cy.get(this.emailIDTextBox));
    cy.get(this.emailIDTextBox).clear().type(global.username);
    cy.waitUntil(() => cy.get(this.passwordTextBox));
    cy.get(this.passwordTextBox).clear().type(global.password);
    cy.get(this.logInButton).click();
    cy.waitUntil(() => cy.get("div:contains('aitest1')").should("be.visible"));
  }
  logout() {
    cy.get(this.myProfileIcon).click();
    cy.contains("Logout").click();
  }
}
