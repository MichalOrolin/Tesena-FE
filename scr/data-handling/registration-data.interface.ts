import { PersonalInfoData } from "./personal-info-data.interface";

export interface RegistrationData extends PersonalInfoData {
  password: string;
  invalidEmail: string;
  duplicateEmail: string;
  shortPassword: string;
  weakPassword: string;
  invalidMinPassword: string;
  invalidMaxPassword: string;
  validMinPassword: string;
  validMaxPassword: string;
  invalidFirstName: string;
}
