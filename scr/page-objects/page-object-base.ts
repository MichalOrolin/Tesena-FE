export class PageObjectBase {
  private readonly homeUrl = "/en/";

  visitHome(): this {
    cy.visit(this.homeUrl);
    return this;
  }

  clickColorVariant(color: string): this {
    cy.get(`.js-product-miniature .variant-links .color[title="${color}"]`)
      .first()
      .click();
    return this;
  }

  setQuantity(quantity: number): this {
    cy.get("#quantity_wanted").clear().type(String(quantity));
    return this;
  }

  addToCart(): this {
    cy.intercept("POST", "/en/cart").as("addToCart");
    cy.get("[data-button-action='add-to-cart']").click();
    cy.wait("@addToCart");
    return this;
  }

}
