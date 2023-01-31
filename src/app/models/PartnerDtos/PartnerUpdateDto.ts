import { PartnerPhoneCreateDto } from "./PartnerCreateDto";

export class PartnerUpdateDto {
  Partner_ID!: number;
  IsActiveRent!: boolean
  IsActiveSale!: boolean
  Email: string | undefined;
  Website: string | undefined;
  Notes: string | undefined;
  IsSubscribedRent!: boolean;
  IsSubscribedSale!: boolean;
  CityIDs!: Array<string>;
  PartnerPhones!: Array<PartnerPhoneCreateDto>;
}
