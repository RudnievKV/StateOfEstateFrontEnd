import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'propertyCityName' })
export class PropertyCityNamePipe implements PipeTransform {
  constructor(
    private _translocoService: TranslocoService
  ) { }
  transform(propertyDto: PropertyDto, trigger: number): string {
    let currentLanguage = this._translocoService.getActiveLang();
    console.log("PropertyCityNamePipe trigger");
    let cityName = propertyDto.Cities[0].Local_Cities.find(s => s.Local.LocalizationCode == currentLanguage)?.LocalCityName;
    if (cityName) {
      return cityName;
    } else {
      return "";
    }
  }
}
