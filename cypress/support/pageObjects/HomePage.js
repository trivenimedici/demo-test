export default class HomePage {
  constructor() {
    this.balance = ".balance-details";
  }
  storeUserInitialBalance() {
    cy.get(this.balance)
      .invoke("text")
      .then((txt) => {
        let bal = txt.split(": ");
        global.userBalance = bal[1];
        cy.log("the user initial balance is " + global.userBalance);
      });
  }
}
