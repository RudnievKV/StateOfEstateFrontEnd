export class NeighborhoodCreateDto {
  City_ID!: number;
  Local_Neighborhoods!: Array<LocalNeighborhoodValue>;
  constructor(City_ID: number, Local_Neighborhoods: Array<LocalNeighborhoodValue>) {
    this.City_ID = City_ID;
    this.Local_Neighborhoods = Local_Neighborhoods;
  }
}
export class LocalNeighborhoodValue {
  LocalNeighborhoodName!: string | null;
  Local_ID!: number;
  constructor(LocalNeighborhoodName: string, localID: number) {
    this.LocalNeighborhoodName = LocalNeighborhoodName;
    this.Local_ID = localID;
  }
}
