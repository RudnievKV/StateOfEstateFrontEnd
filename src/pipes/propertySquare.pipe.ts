import { Pipe, PipeTransform } from '@angular/core';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'propertySquare' })
export class PropertySquarePipe implements PipeTransform {
  transform(propertyDto: PropertyDto) {
    if (propertyDto.Type == "Land")
      return propertyDto.LandAreaSquare;
    else
      return propertyDto.HouseAreaSquare;

  }
}
