export class BenefitCreateDto {
  Local_Benefits!: Array<LocalBenefitValue>;
  constructor(Local_Benefits: Array<LocalBenefitValue>) {
    this.Local_Benefits = Local_Benefits;
  }
}
export class LocalBenefitValue {
  LocalBenefitName!: string | null;
  Local_ID!: number;
  constructor(LocalBenefitName: string, localID: number) {
    this.LocalBenefitName = LocalBenefitName;
    this.Local_ID = localID;
  }
}
