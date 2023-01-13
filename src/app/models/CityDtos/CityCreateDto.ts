export class CityCreateDto {
    Local_Cities!: Array<LocalCityValue>;
    constructor() {
    }
}
export class LocalCityValue {
    LocalCityName!: string | null;
    Local_ID!: number;
}