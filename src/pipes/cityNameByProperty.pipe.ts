import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'cityNameByProperty' })
export class CityNameByPropertyPipe implements PipeTransform {
  constructor(
    private _translocoService: TranslocoService
  ) { }
  transform(propertyDto: PropertyDto, trigger: number) {
    if (propertyDto.Cities.length > 0) {
      let currentLanguage = this._translocoService.getActiveLang();
      console.log("cityNameByPropertyPipe trigger");
      return propertyDto.Cities[0].Local_Cities.find(element => element.Local.LocalizationCode == currentLanguage)?.LocalCityName;
    }
    return "";
  }
}
