import { Component } from '@angular/core';

@Component({
  selector: 'app-benefit-change',
  templateUrl: './benefit-change.component.html',
  styleUrls: ['./benefit-change.component.scss']
})
export class BenefitChangeComponent {
  value = ""
  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}
