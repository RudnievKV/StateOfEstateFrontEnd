import { Component } from '@angular/core';

@Component({
  selector: 'app-benefit-add',
  templateUrl: './benefit-add.component.html',
  styleUrls: ['./benefit-add.component.scss']
})
export class BenefitAddComponent {
  value = ""
  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}
