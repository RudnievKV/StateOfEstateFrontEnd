import { LocalNeighborhoodValue } from "./NeighborhoodCreateDto";

export class NeighborhoodUpdateDto {
    City_ID!: number;
    Local_Neighborhoods!: Array<LocalNeighborhoodValue>;
    constructor() {

    }
}