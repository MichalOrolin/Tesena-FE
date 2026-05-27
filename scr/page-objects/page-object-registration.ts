import { RegistrationData } from "../data-handling/registration-data.interface";
import { fillPersonalInfo } from "../helpers/form-helpers";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const json = require("../fixtures/registration.json") as RegistrationData;

export const testDataRegistration = {
  ...json,
  getData(overrides: Partial<RegistrationData> = {}): RegistrationData {
    return { ...json, ...overrides };
  },
};

class PageObjectRegistration {
  private readonly url = "/en/registration";

  visit(): this {
    cy.visit(this.url);
    return this;
  }

  fillForm(data: RegistrationData): this {
    fillPersonalInfo(data);
    cy.typeInField("#field-password", data.password);
    return this;
  }

  registerUser(data: RegistrationData): this {
    this.fillForm(data);
    this.submit();
    this.verifyRegistration(data);
    return this;
  }

  submit(): this {
    // cy.intercept("POST", "/en/registration").as("registerRequest");
    cy.get('[data-link-action="save-customer"]').click();
    // cy.wait("@registerRequest").its("response.statusCode").should("eq", 200);
    return this;
  }

  verifyError(message: string): this {
    cy.get(".help-block .alert-danger").should("contain", message);
    return this;
  }

  verifyStaysOnPage(): this {
    cy.url().should("include", "/en/registration");
    return this;
  }

  verifyRegistration(data: RegistrationData): this {
    const fullName = `${data.firstName} ${data.lastName}`;
    cy.get(".user-info .hidden-sm-down").should(($el) => {
      expect($el.text(), "Registration failed").to.include(fullName);
    });
    return this;
  }
}

export const pageObjectRegistration = new PageObjectRegistration();
