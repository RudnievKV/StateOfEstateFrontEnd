import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'selectedStringArray' })
export class SelectedStringArrayPipe implements PipeTransform {
  constructor(
  ) { }
  transform(selectedArray: Array<string>, trigger: number): string {
    let result = "";
    console.log("SelectedStringArrayPipe trigger");
    selectedArray.forEach(selected => {
      if (result == "") {
        result += selected;
      } else {
        result += ", " + selected;
      }
    });
    return result;
  }
}
