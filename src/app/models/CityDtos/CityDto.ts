import { Local_CityDto } from "../Local_CityDtos/Local_CityDto";
import { NeighborhoodDto } from "../NeighborhoodDtos/NeighborhoodDto";

export class CityDto {
    City_ID!: number;
    Local_Cities!: Array<Local_CityDto>;
    Neighborhoods!: Array<NeighborhoodDto> | null;
    constructor() {
    }
}