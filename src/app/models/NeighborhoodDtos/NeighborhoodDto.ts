import { Local_NeighborhoodDto } from "../Local_NeighborhoodDtos/Local_NeighborhoodDto";

export class NeighborhoodDto {
    Neighborhood_ID!: number;
    City_ID!: number;
    Local_Neighborhoods!: Array<Local_NeighborhoodDto>;
    constructor() {

    }
}