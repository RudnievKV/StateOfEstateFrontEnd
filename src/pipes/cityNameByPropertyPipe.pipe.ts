import { Pipe, PipeTransform } from '@angular/core';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'cityNameByProperty' })
export class CityNameByPropertyPipe implements PipeTransform {
  transform(propertyDto: PropertyDto) {
    if (propertyDto.Cities.length > 0) {
      return propertyDto.Cities[0].Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
    }
    return "";
  }
}
