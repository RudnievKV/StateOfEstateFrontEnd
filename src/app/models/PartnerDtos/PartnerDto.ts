import { CityDto } from "../CityDtos/CityDto";

export class PartnerDto {
  Partner_ID!: number;
  IsActiveRent!: boolean
  IsActiveSale!: boolean
  Email: string | undefined;
  Website: string | undefined;
  Notes: string | undefined;
  IsSubscribedRent!: boolean;
  IsSubscribedSale!: boolean;
  Cities!: Array<CityDto>;
  PartnerPhones!: Array<PartnerPhoneDto>;
}
export class PartnerPhoneDto {
  PartnerPhone_ID!: number;
  PhoneNumber!: string;
  Note!: string;
  Partner_ID!: number;
}
