import { PersonalInfoData } from "../data-handling/personal-info-data.interface";
import { ShoppingData } from "../data-handling/shopping-data.interface";
import { fillPersonalInfo } from "../helpers/form-helpers";
import { PageObjectBase } from "./page-object-base";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const json = require("../fixtures/shopping.json") as ShoppingData;

export const testDataShopping = {
  ...json,
  getData(): ShoppingData {
    return { ...json };
  },
};

class PageObjectShopping extends PageObjectBase {
  visitProduct(url: string): this {
    cy.visit(url);
    return this;
  }

  proceedToCheckoutFromModal(): this {
    cy.get("#blockcart-modal").should("be.visible");
    cy.get("#blockcart-modal .btn-primary").click();
    return this;
  }

  proceedToCheckoutFromCart(): this {
    cy.get(".checkout a").click();
    return this;
  }

  fillPersonalInfo(data: PersonalInfoData): this {
    fillPersonalInfo(data);
    return this;
  }

  clickPersonalInfoContinue(): this {
    cy.get("#checkout-guest-form .continue").click();
    return this;
  }

  fillAddress(data: ShoppingData): this {
    cy.intercept("POST", /action=addressForm/).as("addressForm");
    cy.get("#checkout-addresses-step #field-id_country").select(data.country);
    cy.wait("@addressForm");
    cy.get("#checkout-addresses-step #field-firstname").clear();
    cy.get("#checkout-addresses-step #field-firstname").type(data.firstName);
    cy.get("#checkout-addresses-step #field-lastname").clear();
    cy.get("#checkout-addresses-step #field-lastname").type(data.lastName);
    cy.typeInField("#checkout-addresses-step #field-address1", data.address);
    cy.typeInField("#checkout-addresses-step #field-postcode", data.postcode);
    cy.typeInField("#checkout-addresses-step #field-city", data.city);
    if (data.phone) cy.typeInField("#checkout-addresses-step #field-phone", data.phone);
    return this;
  }

  clickAddressContinue(): this {
    cy.get("#checkout-addresses-step .continue").click();
    return this;
  }

  verifyOnAddressStep(): this {
    cy.get("#checkout-addresses-step").should("have.class", "-current");
    return this;
  }

  verifyOnShippingStep(): this {
    cy.get("#checkout-delivery-step").should("have.class", "-current");
    return this;
  }

  clickShippingContinue(): this {
    cy.intercept("POST", /en\/order/).as("shippingSubmit");
    cy.get("#checkout-delivery-step .continue").click();
    cy.wait("@shippingSubmit");
    return this;
  }

  verifyOnPaymentStep(): this {
    cy.get("#checkout-payment-step").should("have.class", "-current");
    return this;
  }
}

export const pageObjectShopping = new PageObjectShopping();
