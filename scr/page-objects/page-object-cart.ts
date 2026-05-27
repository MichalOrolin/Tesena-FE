import { CartData } from "../data-handling/cart-data.interface";
import { PageObjectBase } from "./page-object-base";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const json = require("../fixtures/cart.json") as CartData;

export const testDataCart = {
  ...json,
  getData(): CartData {
    return { ...json };
  },
};

class PageObjectCart extends PageObjectBase {
  private readonly cartUrl = "/en/cart";

  continueShopping(): this {
    cy.get("#blockcart-modal .btn-secondary").click();
    return this;
  }

  verifyCartCount(count: number): this {
    cy.get(".cart-products-count").should("contain", `(${count})`);
    return this;
  }

  goToCart(): this {
    cy.visit(this.cartUrl);
    return this;
  }

  verifyProductInCart(name: string): this {
    cy.get(".cart-item .label").first().should("contain", name);
    return this;
  }

  removeFromCart(): this {
    cy.get(".remove-from-cart").first().click();
    return this;
  }

  verifyCartEmpty(): this {
    cy.get(".cart-products-count").should("contain", "(0)");
    return this;
  }
}

export const pageObjectCart = new PageObjectCart();
