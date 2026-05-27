import { withUniqueEmail } from "../helpers/email-helpers";
import { pageObjectRegistration, testDataRegistration } from "../page-objects/page-object-registration";

describe("User registration", () => {
  beforeEach(() => {
    pageObjectRegistration.visit();
  });

  describe("Happy path", () => {
    it("Sign up with valid data", () => {
      pageObjectRegistration.registerUser(withUniqueEmail(testDataRegistration.getData()));
    });
  });

  describe("Required fields validation", () => {
    it("Empty form", () => {
      pageObjectRegistration.submit().verifyStaysOnPage();
    });
  });

  describe("Email validation", () => {
    it("Invalid email format", () => {
      pageObjectRegistration
        .fillForm(testDataRegistration.getData({ email: testDataRegistration.invalidEmail }))
        .submit()
        .verifyError("Invalid format.");
    });

    it("Already registered email", () => {
      pageObjectRegistration
        .fillForm(testDataRegistration.getData({ email: testDataRegistration.duplicateEmail }))
        .submit()
        .verifyError("The email is already used, please choose another one or sign in");
    });
  });

  describe("Password", () => {
    it("Weak password", () => {
      pageObjectRegistration
        .fillForm(withUniqueEmail(testDataRegistration.getData({ password: testDataRegistration.weakPassword })))
        .submit()
        .verifyError("The minimum score must be: Strong");
    });

    it("Password min invalid length (7 chars)", () => {
      pageObjectRegistration
        .fillForm(withUniqueEmail(testDataRegistration.getData({ password: testDataRegistration.invalidMinPassword })))
        .submit()
        .verifyError("The minimum score must be: Strong");
    });

    it("Password max invalid length (73 chars)", () => {
      pageObjectRegistration
        .fillForm(withUniqueEmail(testDataRegistration.getData({ password: testDataRegistration.invalidMaxPassword })))
        .submit()
        .verifyError("Password must be between 8 and 72 characters long");
    });

    it("Password min valid length (8 chars)", () => {
      const credentials = withUniqueEmail(testDataRegistration.getData({ password: testDataRegistration.validMinPassword }));
      pageObjectRegistration.fillForm(credentials).submit().verifyRegistration(credentials);
    });

    it("Password max valid length (72 chars)", () => {
      const credentials = withUniqueEmail(testDataRegistration.getData({ password: testDataRegistration.validMaxPassword }));
      pageObjectRegistration.fillForm(credentials).submit().verifyRegistration(credentials);
    });
  });

  describe("Name validation", () => {
    it("Numbers in first name show error", () => {
      pageObjectRegistration
        .fillForm(testDataRegistration.getData({ firstName: testDataRegistration.invalidFirstName }))
        .submit()
        .verifyError("Invalid format.");
    });
  });

  describe("Required checkboxes", () => {
    it("GDPR", () => {
      pageObjectRegistration
        .fillForm(testDataRegistration.getData({ psgdpr: false }))
        .submit()
        .verifyStaysOnPage();
    });

    it("Customer privacy", () => {
      pageObjectRegistration
        .fillForm(testDataRegistration.getData({ customerPrivacy: false }))
        .submit()
        .verifyStaysOnPage();
    });
  });
});
