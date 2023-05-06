import { Component, Input, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss', '../user-properties/user-properties.component.scss']
})
export class PropertyCardComponent {
  @Input() property!: PropertyDto;
  private routeSub!: Subscription;
  currentIndx = 0;
  photoUrls = new Array<string>();
  rentalPeriod = "any";
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _translocoService: TranslocoService
  ) {
    this.languageChangeSubscription = _translocoService.langChanges$.subscribe(lang => {
      this.trigger = this.trigger + 1;
    });
  }
  languageChangeSubscription!: Subscription;
  trigger = 0;

  ngOnInit() {
    this.property.Photos!.forEach(photo => {
      this.photoUrls.push(photo.PhotoUrl);
    });
    this.routeSub = this._activatedRoute.params.subscribe(params => {
      if (params['id'] && params['id'][0] == "r") {
        this.rentalPeriod = "any";
      }
      else {
        this.rentalPeriod = "sale";
      }
    });
    console.log(this.rentalPeriod + " " + this.property.Property_ID);
  }
  goToPrev() {
    if (this.currentIndx === 0) {
      return;
    }
    this.currentIndx--;
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.languageChangeSubscription.unsubscribe();
  }
  goToNext() {
    if (this.currentIndx === this.photoUrls.length - 1) {
      this.currentIndx = 0;
      return;
    }
    this.currentIndx++;
  }


}
