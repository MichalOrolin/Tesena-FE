import { PersonalInfoData } from "./personal-info-data.interface";

export interface ShoppingData extends PersonalInfoData {
  productUrl: string;
  productName: string;
  quantity: number;
  address: string;
  postcode: string;
  city: string;
  country: string;
  phone?: string;
}
