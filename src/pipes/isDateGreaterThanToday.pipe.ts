import { Pipe, PipeTransform } from '@angular/core';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'isDateGreaterThanToday' })
export class isDateGreaterThanTodayPipe implements PipeTransform {
  transform(date: Date | string): boolean {
    let currentDate = new Date();
    let parsedDate = new Date(date);
    return currentDate.getTime() < parsedDate.getTime();
  }
}
