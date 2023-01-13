import { LocalDto } from "../LocalDtos/LocalDto";

export class Local_NeighborhoodDto {
    Local_Neighborhood_ID!: number;
    Local!: LocalDto;
    LocalNeighborhoodName!: string | null;
    constructor() {

    }
}