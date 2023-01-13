export class PropertyCreateDto {

    City_IDs!: Array<number>;
    Benefit_IDs!: Array<number>;
    Photos!: Array<PhotoPositionValue>;
    Local_Properties!: Array<LocalPropertyValue>;


    SaleCode: string | null = "";
    RentCode!: string | null;
    SaleStatus: string = "";
    RentStatus: string = "";
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
    CoordinateX!: number;
    CoordinateY!: number;
    BedroomCount!: number | null;
    HouseAreaSquare!: number | null;
    LandAreaSquare!: number | null;
    Floor!: number | null;
    BathroomCount!: number | null;
    Type!: string;


    constructor() {

    }
}
export class LocalPropertyValue {
    LocalPropertyTitle!: string | null;
    LocalPropertyDescription!: string | null;
    Local_ID!: number;
    constructor() {

    }
}
export class PhotoPositionValue {
    Photo!: File;
    Position!: number;
    constructor() {

    }
} 
