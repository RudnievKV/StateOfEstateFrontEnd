import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private routeSub!: Subscription;
  constructor(
    private _router: Router,
    private _translocoService: TranslocoService

  ) { }
  status: boolean = false;
  clickEvent(event: Event) {
    this.status = !this.status;
  }


  currentLanguage = "";
  secondaryLanguages = new Array<string>();

  ngOnInit() {
    this.currentLanguage = this._translocoService.getActiveLang().toUpperCase();
    this.setSecondaryLanguages();
  }


  languageChange(event: Event) {
    let target = event.target as HTMLLinkElement;
    let value = target.innerText.toLowerCase();
    console.log(value);

    this._translocoService.setActiveLang(value);
    this.currentLanguage = value.toUpperCase();
    this.setSecondaryLanguages();
  }
  setSecondaryLanguages() {
    this.secondaryLanguages = [];
    let languages = this._translocoService.getAvailableLangs();
    languages.forEach(language => {
      if (language != this.currentLanguage.toLowerCase()) {
        this.secondaryLanguages.push(language.toString().toUpperCase());
      }
    });
  }
}
