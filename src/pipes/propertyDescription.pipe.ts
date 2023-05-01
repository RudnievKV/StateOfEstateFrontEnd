import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'propertyDescription' })
export class PropertyDescriptionPipe implements PipeTransform {
  constructor(
    private _translocoService: TranslocoService
  ) { }
  transform(propertyDto: PropertyDto, trigger: number, type = 'rent'): string {
    let currentLanguage = this._translocoService.getActiveLang();
    console.log("PropertyDescriptionPipe trigger");
    let description = propertyDto.Local_Properties.find(s => s.Local.LocalizationCode == currentLanguage && s.LocalPropertyType == type)?.LocalPropertyDescription;
    if (description) {
      return description;
    } else {
      return "";
    }
  }
}
