import { LocalBenefitValue } from "./BenefitCreateDto";

export class BenefitUpdateDto {
    Local_Benefits!: Array<LocalBenefitValue> | null;
    constructor() {
    }
}