import { Component } from '@angular/core';

@Component({
  selector: 'app-neighborhood-add',
  templateUrl: './neighborhood-add.component.html',
  styleUrls: ['./neighborhood-add.component.scss']
})
export class NeighborhoodAddComponent {
  value = '';
  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}
