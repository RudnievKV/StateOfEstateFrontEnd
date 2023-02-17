import { LocalCityValue } from "./CityCreateDto";

export class CityUpdateDto {
  Local_Cities!: Array<LocalCityValue>;
  constructor(local_Cities: Array<LocalCityValue>) {
    this.Local_Cities = local_Cities;
  }
}
