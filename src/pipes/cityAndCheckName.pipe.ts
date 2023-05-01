import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'cityAndCheckName' })
export class CityAndCheckNamePipe implements PipeTransform {
  constructor(
    private _translocoService: TranslocoService
  ) { }
  transform(cityDtoAndCheck: DataAndCheck<CityDto>, trigger: number): string {
    let currentLanguage = this._translocoService.getActiveLang();
    console.log("CityAndCheckNamePipe trigger");
    let cityName = cityDtoAndCheck.Data.Local_Cities.find(element => element.Local.LocalizationCode == currentLanguage)?.LocalCityName;
    if (cityName) {
      return cityName;
    } else {
      return "";
    }
  }
}
