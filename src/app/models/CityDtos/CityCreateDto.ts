export class CityCreateDto {
  Local_Cities!: Array<LocalCityValue>;
  constructor(local_Cities: Array<LocalCityValue>) {
    this.Local_Cities = local_Cities;
  }
}
export class LocalCityValue {
  LocalCityName!: string | null;
  Local_ID!: number;
  constructor(localCityName: string, localID: number) {
    this.LocalCityName = localCityName;
    this.Local_ID = localID;
  }
}
