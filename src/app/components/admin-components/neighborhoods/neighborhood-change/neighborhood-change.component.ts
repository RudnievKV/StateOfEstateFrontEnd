import { Component } from '@angular/core';

@Component({
  selector: 'app-neighborhood-change',
  templateUrl: './neighborhood-change.component.html',
  styleUrls: ['./neighborhood-change.component.scss']
})
export class NeighborhoodChangeComponent {
  value = '';
  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}
