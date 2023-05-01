import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'benefitName' })
export class BenefitNamePipe implements PipeTransform {
  constructor(
    private _translocoService: TranslocoService
  ) { }
  transform(benefitDto: BenefitDto, trigger: number): string {
    let currentLanguage = this._translocoService.getActiveLang();
    console.log("BenefitNamePipe trigger");
    let benefitName = benefitDto.Local_Benefits.find(s => s.Local.LocalizationCode == currentLanguage)?.LocalBenefitName;
    if (benefitName) {
      return benefitName;
    } else {
      return "";
    }

  }
}
