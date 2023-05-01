import { LocalDto } from "../LocalDtos/LocalDto";

export class Local_BenefitDto {
  Local_Benefit_ID!: number;
  Local!: LocalDto;
  LocalBenefitName!: string | null;
  constructor() {

  }
}
