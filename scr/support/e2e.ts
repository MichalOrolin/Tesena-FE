import "./commands";

beforeEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  cy.intercept("GET", "**/blockreassurance/**", { statusCode: 200, body: "" });
});
