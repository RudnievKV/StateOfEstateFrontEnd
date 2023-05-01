import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { getBrowserLang } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'State of Estate';
  constructor(
    private _translocoService: TranslocoService
  ) { }
  ngOnInit() {
    let browserLanguage = getBrowserLang();
    if (browserLanguage) {
      console.log("Browser Language = " + browserLanguage);
      this._translocoService.setActiveLang(browserLanguage);
    }
  }
}
