export class PartnerCreateDto {
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
export class PartnerPhoneCreateDto {
  PhoneNumber!: string;
  Note!: string;
}
