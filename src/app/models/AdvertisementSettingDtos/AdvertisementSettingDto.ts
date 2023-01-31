import RealticAccountDto from "../RealticAccountDtos/RealticAccountDto";

export default class AdvertisementSettingDto {
  AdvertisementSetting_ID!: number;
  FacebookRent!: boolean;
  InstagramRent!: boolean;
  FacebookSale!: boolean;
  InstagramSale!: boolean;
  HomesOverseasSale!: boolean;
  Property_ID!: number;
  RealticAccountSale_ID!: number;
  RealticAccountSale!: RealticAccountDto;
  RealticAccountRent_ID!: number;
  RealticAccountRent!: RealticAccountDto;
}
