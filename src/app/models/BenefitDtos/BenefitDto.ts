import { Local_BenefitDto } from "../Local_BenefitDtos/Local_BenefitDto";

export class BenefitDto {
    Benefit_ID!: number;
    Local_Benefits!: Array<Local_BenefitDto> | null;
    constructor() {

    }
}