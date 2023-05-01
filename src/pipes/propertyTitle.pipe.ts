import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Pipe({ name: 'propertyTitle' })
export class PropertyTitlePipe implements PipeTransform {
  constructor(
    private _translocoService: TranslocoService
  ) { }
  transform(propertyDto: PropertyDto, trigger: number, type = "rent"): string {
    let currentLanguage = this._translocoService.getActiveLang();
    console.log("PropertyTitlePipe trigger");
    let title = propertyDto.Local_Properties.find(s => s.Local.LocalizationCode == currentLanguage && s.LocalPropertyType == type)?.LocalPropertyTitle;
    if (title) {
      return title;
    } else {
      return "";
    }
  }
}
