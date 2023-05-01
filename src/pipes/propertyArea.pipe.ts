import { Pipe, PipeTransform } from '@angular/core';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'propertyArea' })
export class PropertyAreaPipe implements PipeTransform {
  transform(propertyDto: PropertyDto): number {
    if (propertyDto.Type == "Land" && propertyDto.LandAreaSquare) {
      return propertyDto.LandAreaSquare;
    }
    else if (propertyDto.HouseAreaSquare) {
      return propertyDto.HouseAreaSquare;
    }
    return 0;
  }
}
