export default class casinoPage {
  constructor() {
    this.selectDropdown = ".select-filter";
    this.continueButton = ".custom-btn";
    this.searchBox = "#free-solo-2-demo";
    this.placeBetButton =
      'button:not([class^="Mui-disabled"]) > div[class="content"] > span';
  }
  choosegamefromDropDown(gameToSelect) {
    // cy.waitUntil(() => cy.get(this.selectDropdown).should("exist"));
    cy.waitUntil(() => cy.get(this.searchBox).should("be.visible"));
    cy.get(this.selectDropdown).click({ force: true });
    cy.wait(4000);
    cy.waitUntil(() => cy.contains(gameToSelect).should("exist"));
    cy.contains(gameToSelect).click({ force: true });
  }

  getIframeBody() {
    return cy
      .get(".dc-iframe-ctn > iframe")
      .its("0.contentDocument.body")
      .should("not.be.undefined")
      .then(cy.wrap);
  }

  placeBet(betname, stake) {
    // cy.waitUntil(() => cy.get(".dc-iframe-ctn > iframe").should("exist"));
    cy.wait(40000);
    //  cy.waitUntil(() => cy.findAllByText("Open Bets").should("be.visible"));
    cy.waitUntil(() =>
      // this.getIframeBody().find(".back").eq(1).should("not.be.disabled")
      cy.get(".back").eq(1).should("not.be.disabled")
    );
    cy.get("#outlined-basic").clear().type(stake);
    cy.waitUntil(() =>
      this.getIframeBody().find(this.placeBetButton).should("be.visible")
    );
    this.getIframeBody().find(this.placeBetButton).click();
  }
}
