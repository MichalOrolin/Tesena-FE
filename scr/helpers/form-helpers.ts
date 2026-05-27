import { PersonalInfoData } from "../data-handling/personal-info-data.interface";

export function fillPersonalInfo(data: PersonalInfoData): void {
  if (data.socialTitle) {
    const id = data.socialTitle === "Mr" ? "#field-id_gender-1" : "#field-id_gender-2";
    cy.get(id).check({ force: true });
  }
  cy.typeInField("#field-firstname", data.firstName);
  cy.typeInField("#field-lastname", data.lastName);
  cy.typeInField("#field-email", data.email);
  if (data.birthdate) cy.typeInField("#field-birthday", data.birthdate);
  if (data.psgdpr !== false) cy.get('[name="psgdpr"]').check({ force: true });
  if (data.customerPrivacy !== false) cy.get('[name="customer_privacy"]').check({ force: true });
  if (data.optin !== false) cy.get('[name="optin"]').check();
  if (data.newsletter !== false) cy.get('[name="newsletter"]').check();
}
