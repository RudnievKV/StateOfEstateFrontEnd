export class BenefitCreateDto {
    Local_Benefits!: Array<LocalBenefitValue> | null;
    constructor() {
    }
}
export class LocalBenefitValue {
    LocalBenefitName!: string | null;
    Local_ID!: number;
}