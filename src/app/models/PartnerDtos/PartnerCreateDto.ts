export class PartnerCreateDto {
  IsActiveRent!: boolean
  IsActiveSale!: boolean
  Email: string | undefined;
  Website: string | undefined;
  Notes: string | undefined;
  IsSubscribedRent!: boolean;
  IsSubscribedSale!: boolean;
  CityIDs!: Array<string>;
  PartnerPhones!: Array<PartnerPhoneCreateDto>;
  constructor(
    IsActiveRent: boolean,
    IsActiveSale: boolean,
    Email: string,
    Website: string,
    Notes: string,
    IsSubsribedSale: boolean,
    IsSubsribedRent: boolean,
    CityIDs: Array<string>,
    PartnerPhones: Array<PartnerPhoneCreateDto>) {
    this.IsActiveRent = IsActiveRent;
    this.IsActiveSale = IsActiveSale;
    this.Email = Email;
    this.Website = Website;
    this.Notes = Notes;
    this.IsSubscribedSale = IsSubsribedSale;
    this.IsSubscribedRent = IsSubsribedRent;
    this.CityIDs = CityIDs;
    this.PartnerPhones = PartnerPhones;
  }
}
export class PartnerPhoneCreateDto {
  PhoneNumber!: string;
  Note!: string;
}
