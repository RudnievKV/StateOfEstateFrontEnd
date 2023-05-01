import { BenefitDto } from "../BenefitDtos/BenefitDto";
import { CityDto } from "../CityDtos/CityDto";
import { Local_PropertyDto } from "../Local_PropertyDtos/Local_PropertyDto";
import { PhotoDto } from "../PhotoDtos/PhotoDto";

export class PropertyDto {
  Property_ID!: number;

  Photos!: Array<PhotoDto> | null;
  Cities!: Array<CityDto>;
  Benefits!: Array<BenefitDto> | null;
  Local_Properties!: Array<Local_PropertyDto>;
  CreatedDate!: Date;

  SaleCode!: string | null;
  RentCode!: string | null;
  SaleStatus!: string;
  RentStatus!: string;
  Notes!: string | null;
  FloorsInABuilding!: number | null;
  ConstructionYear!: number | null;
  RoomCount!: number | null;
  RentPrice!: number | null;
  RentPriceBeforeSeason!: number | null;
  RentPriceFullSeason!: number | null;
  SalePrice!: number | null;
  CounterAgentNumber!: number | null;
  VideoID!: string | null;
  RentPromoteStatus!: boolean;
  SalePromoteStatus!: boolean;
  Pets!: boolean;
  TurkishKebabs!: boolean;
  AdditionalInfo!: string | null;
  CoordinateX!: number | null;
  CoordinateY!: number | null;
  BedroomCount!: number | null;
  HouseAreaSquare!: number | null;
  LandAreaSquare!: number | null;
  Floor!: number | null;
  BathroomCount!: number | null;
  IsForSale!: boolean;
  Type!: string;

  constructor() {

  }
}
