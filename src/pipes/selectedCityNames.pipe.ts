import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'selectedCityNames' })
export class SelectedCityNamesPipe implements PipeTransform {
  constructor(
    private _translocoService: TranslocoService
  ) { }
  transform(selectedCities: Array<CityDto>, trigger: number): string {
    let currentLanguage = this._translocoService.getActiveLang();
    let result = "";
    console.log("SelectedCityNamesPipe trigger");
    selectedCities.forEach(cityDto => {
      let cityName = cityDto.Local_Cities
        .find(element => element.Local.LocalizationCode == currentLanguage)?.LocalCityName;
      if (cityName) {
        if (result == "") {
          result += cityName;
        } else {
          result += ", " + cityName;
        }
      }
    });
    return result;
  }
}
