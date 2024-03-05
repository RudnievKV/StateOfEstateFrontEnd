import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'selectedBenefitNames' })
export class SelectedBenefitNamesPipe implements PipeTransform {
  constructor(
    private _translocoService: TranslocoService
  ) { }
  transform(selectedBenefits: Array<BenefitDto>, trigger: number): string {
    let currentLanguage = this._translocoService.getActiveLang();
    let result = "";
    console.log("SelectedBenefitNamesPipe trigger");
    selectedBenefits.forEach(benefitDto => {
      let benefitName = benefitDto.Local_Benefits
        .find(element => element.Local.LocalizationCode == currentLanguage)?.LocalBenefitName;
      if (benefitName) {
        if (result == "") {
          result += benefitName;
        } else {
          result += ", " + benefitName;
        }
      }
    });
    console.log(result);
    return result;
  }
}
