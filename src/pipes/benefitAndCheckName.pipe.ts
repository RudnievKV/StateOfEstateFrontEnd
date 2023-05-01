import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'benefitAndCheckName' })
export class BenefitAndCheckNamePipe implements PipeTransform {
  constructor(
    private _translocoService: TranslocoService
  ) { }
  transform(benefitDtoAndCheck: DataAndCheck<BenefitDto>, trigger: number): string {
    let currentLanguage = this._translocoService.getActiveLang();
    console.log("benefitAndCheckName trigger");
    let benefitName = benefitDtoAndCheck.Data.Local_Benefits
      .find(element => element.Local.LocalizationCode == currentLanguage)?.LocalBenefitName;
    if (benefitName) {
      return benefitName;
    } else {
      return "";
    }
  }
}
