// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-wait-until";
import "@testing-library/cypress/add-commands";
Cypress.Commands.add(
  "waitTillElementDisappears",
  (locator, attribute, attrvalue) => {
    cy.get(locator).then(($newVal) => {
      cy.waitUntil(() => $newVal.attr(attribute) !== attrvalue, {
        errorMsg: "was expecting element to disappear but is not disappeared",
        timeout: 10000,
        interval: 500,
      }).then(() => {
        cy.log("Found a difference in values");
      });
    });
  }
);

Cypress.Commands.add("waitTillElementExists", (locator) => {
  cy.get(locator, { timeout: 10000 }).should("exist");
});

Cypress.Commands.add("waitTillElementNotExists", (locator) => {
  cy.get(locator, { timeout: 50000 }).should("not.exist");
});

Cypress.Commands.add("goOffline", () => {
  cy.log("**go offline**");
  Cypress.automation("remote:debugger:protocol", {
    command: "Network:enable",
  });
  Cypress.automation("remote:debugger:protocol", {
    command: "Network.emulateNetworkConditions",
    params: {
      offline: true,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
      connectionType: "none",
    },
  });
});

Cypress.Commands.add("goOnline", () => {
  cy.log("**go online**");
  Cypress.automation("remote:debugger:protocol", {
    command: "Network:disable",
  });
  Cypress.automation("remote:debugger:protocol", {
    command: "Network.emulateNetworkConditions",
    params: {
      offline: false,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
      connectionType: "none",
    },
  });
});

Cypress.Commands.add("assertOnline", () => {
  cy.waitUntil(
    () => cy.wrap(window).its("navigator.onLine").should("be.true"),
    {
      errorMsg: "was expecting network to be online but it is offline",
      timeout: 10000,
      interval: 500,
    }
  ).then(() => {
    cy.log("the network is online");
  });
});

Cypress.Commands.add("assertOffline", () => {
  return cy.wrap(window).its("navigator.onLine").should("be.false");
});

Cypress.Commands.add("assertAttrContainsValue", (locator, attr, value) => {
  cy.get(locator).then(($els) => {
    const attrvalue = $els.attr(attr);
    expect(attrvalue).contains(value);
  });
});
Cypress.Commands.add("forceVisit", (url) => {
  cy.window().then((win) => {
    return win.open(url, "_self");
  });
});

Cypress.Commands.add("removeDomElement", (selector) => {
  cy.document({ log: false }).then(($document) => {
    const documentResult = $document.querySelectorAll(selector);
    if (documentResult.length) {
      cy.get(selector).then(($el) => {
        $el.remove();
        cy.log("Element removed in the DOM");
      });
    }
  });
});

Cypress.Commands.add("shouldContainRegex", (locator, regex) => {
  cy.highlightBorderElement(locator, "magenta");

  cy.get(locator).contains(regex).should("exist");

  cy.highlightBorderElement(locator, "transparent");
});

Cypress.Commands.add(
  "navigateTo",
  (methodRequest, urlToIntercept, alias, url, statusCode) => {
    cy.intercept({
      method: methodRequest,
      url: urlToIntercept,
    }).as(alias);

    cy.visit(url);

    cy.wait(`@${alias}`).its("response.statusCode").should("eq", statusCode);
  }
);

Cypress.Commands.add(
  "interceptUrl",
  (methodRequest, urlToIntercept, alias, statusCode) => {
    cy.intercept({
      method: methodRequest,
      url: urlToIntercept,
    }).as(alias);

    cy.wait(`@${alias}`).its("response.statusCode").should("eq", statusCode);
  }
);

Cypress.Commands.add("disableSmoothScroll", () => {
  cy.document().then((document) => {
    const node = document.createElement("style");
    node.innerHTML = "html { scroll-behavior: inherit !important; }";
    document.body.appendChild(node);
  });
});

Cypress.Commands.add("swipeUp", (locator) => {
  cy.get(locator)
    .trigger("mousedown")
    .trigger("mousemove", { clientX: 100, clientY: 275 })
    .trigger("mouseup", { force: true });
});
