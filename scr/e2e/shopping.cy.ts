import { withUniqueEmail } from "../helpers/email-helpers";
import { pageObjectShopping, testDataShopping } from "../page-objects/page-object-shopping";

describe("Shopping flow", () => {
  beforeEach(() => {
    pageObjectShopping.visitHome();
  });

  it("Buy items without sign in", () => {
    const data = testDataShopping.getData();
    pageObjectShopping
      .visitProduct(data.productUrl)
      .setQuantity(data.quantity)
      .addToCart()
      .proceedToCheckoutFromModal()
      .proceedToCheckoutFromCart()
      .fillPersonalInfo(withUniqueEmail(data))
      .clickPersonalInfoContinue()
      .verifyOnAddressStep()
      .fillAddress(data)
      .clickAddressContinue()
      .verifyOnShippingStep()
      .clickShippingContinue()
      .verifyOnPaymentStep();
  });
});
