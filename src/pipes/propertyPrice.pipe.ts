import { Pipe, PipeTransform } from '@angular/core';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'propertyPrice' })
export class PropertyPricePipe implements PipeTransform {
  transform(propertyDto: PropertyDto, rentalPeriod = 'any') {
    switch (rentalPeriod) {
      case 'any': {
        if (propertyDto.RentPrice != null || propertyDto.RentPrice != 0) {
          return propertyDto.RentPrice;
        }
        if (propertyDto.RentPriceFullSeason != null || propertyDto.RentPriceFullSeason != 0) {
          return propertyDto.RentPriceFullSeason;
        }
        return 0;
      }
      case 'long-term': {
        if (propertyDto.RentPrice != null || propertyDto.RentPrice != 0) {
          return propertyDto.RentPrice;
        } else {
          return 0;
        }
      }
      case 'whole-season': {
        if (propertyDto.RentPriceFullSeason != null || propertyDto.RentPriceFullSeason != 0) {
          return propertyDto.RentPriceFullSeason;
        } else {
          return 0;
        }
      }
      case 'sale': {
        if (propertyDto.SalePrice != null || propertyDto.SalePrice != 0) {
          return propertyDto.SalePrice;
        } else {
          return 0;
        }
      }
      default: {
        return 0;
      }
    }
  }
}
