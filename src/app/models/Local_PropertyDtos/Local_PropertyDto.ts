import { LocalDto } from "../LocalDtos/LocalDto";

export class Local_PropertyDto {
    Local_Property_ID!: number;
    Local!: LocalDto;
    LocalPropertyTitle!: string;
    LocalPropertyDescription!: string | null;
    constructor() {

    }
}