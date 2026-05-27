export {};

import { CartData } from "../data-handling/cart-data.interface";
import { RegistrationData } from "../data-handling/registration-data.interface";
import { ShoppingData } from "../data-handling/shopping-data.interface";

declare global {
  namespace Cypress {
    interface Chainable {
      typeInField(selector: string, value: unknown): void;
    }

    interface Cypress {
      env(key: "registration"): RegistrationData;
      env(key: "cart"): CartData;
      env(key: "shopping"): ShoppingData;
    }
  }
}

Cypress.Commands.add("typeInField", (selector: string, value: unknown) => {
  cy.get(selector).type(String(value));
});
