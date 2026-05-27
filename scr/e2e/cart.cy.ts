import { pageObjectCart, testDataCart } from "../page-objects/page-object-cart";

describe("Shopping cart", () => {
  beforeEach(() => {
    pageObjectCart.visitHome();
  });

  describe("Add to cart", () => {
    it("Add item", () => {
      pageObjectCart
        .clickColorVariant(testDataCart.productColor)
        .addToCart()
        .verifyCartCount(1);
    });

    it("Add multiple items", () => {
      pageObjectCart
        .clickColorVariant(testDataCart.productColor)
        .setQuantity(testDataCart.quantity)
        .addToCart()
        .verifyCartCount(testDataCart.quantity);
    });
  });

  describe("Cart page", () => {
    it("Product appears in the cart", () => {
      pageObjectCart
        .clickColorVariant(testDataCart.productColor)
        .addToCart()
        .continueShopping()
        .goToCart()
        .verifyProductInCart(testDataCart.productName);
    });

    it("Remove product from the cart", () => {
      pageObjectCart
        .clickColorVariant(testDataCart.productColor)
        .addToCart()
        .continueShopping()
        .goToCart()
        .removeFromCart()
        .verifyCartEmpty();
    });
  });
});
