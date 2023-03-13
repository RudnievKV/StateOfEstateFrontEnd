import { LocalBenefitValue } from "./BenefitCreateDto";

export class BenefitUpdateDto {
  Local_Benefits!: Array<LocalBenefitValue>;
  constructor(Local_Benefits: Array<LocalBenefitValue>) {
    this.Local_Benefits = Local_Benefits;
  }
}
