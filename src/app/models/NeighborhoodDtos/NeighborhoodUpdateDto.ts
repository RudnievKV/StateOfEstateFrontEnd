import { LocalNeighborhoodValue } from "./NeighborhoodCreateDto";

export class NeighborhoodUpdateDto {
  City_ID!: number;
  Local_Neighborhoods!: Array<LocalNeighborhoodValue>;
  constructor(City_ID: number, Local_Neighborhoods: Array<LocalNeighborhoodValue>) {
    this.City_ID = City_ID;
    this.Local_Neighborhoods = Local_Neighborhoods;
  }
}
