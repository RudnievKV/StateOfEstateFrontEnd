export class NeighborhoodCreateDto {
    City_ID!: number;
    Local_Neighborhoods!: Array<LocalNeighborhoodValue>;
    constructor() {

    }
}
export class LocalNeighborhoodValue {
    LocalNeighborhoodName!: string | null;
    Local_ID!: number;
}