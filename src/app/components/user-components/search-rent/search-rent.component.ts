import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription, firstValueFrom, forkJoin } from 'rxjs';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import PagedResponse from 'src/app/models/PagedResponse';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';
import { BenefitService } from 'src/app/services/benefit.service';
import { CityService } from 'src/app/services/city.service';
import { PropertyService } from 'src/app/services/property.service';


@Component({
  selector: 'app-search-rent',
  templateUrl: './search-rent.component.html',
  styleUrls: ['./search-rent.component.scss']
})
export class SearchRentComponent {

  constructor(
    private _benefitService: BenefitService,
    private _cityService: CityService,
    private _propertyService: PropertyService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _translocoService: TranslocoService
  ) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.languageChangeSubscription = _translocoService.langChanges$.subscribe(lang => {
      this.currentDropdown = null;
      this.priceChangeRent();
      this.trigger = this.trigger + 1;
    });
  }
  languageChangeSubscription!: Subscription;
  trigger = 0;
  ngOnDestroy() {
    this.languageChangeSubscription.unsubscribe();
  }

  cities!: Array<DataAndCheck<CityDto>>;
  benefits!: Array<DataAndCheck<BenefitDto>>;
  properties!: PagedResponse<PropertyDto>;

  async ngOnInit() {


    let citiesObservable = this._cityService.GetAllCities();
    let benefitsObservable = this._benefitService.GetAllBenefits();

    let queryParams = this._activatedRoute.snapshot.queryParams;
    let httpParams = new HttpParams();
    httpParams = httpParams.appendAll(queryParams);




    httpParams = httpParams.append("page-size", 20);
    httpParams = httpParams.append("page-number", 1);
    httpParams = httpParams.append("rental-period", this.rentalPeriod);


    let propertiesObservable = this._propertyService.SearchPropertiesPaged(httpParams);


    let currentPage = httpParams.get("page-number");
    if (currentPage) {
      httpParams = httpParams.set("page-number", parseInt(currentPage) + 1);
    }
    this.nextPageUrl = this._router.url + httpParams.toString();
    console.log(this.nextPageUrl);


    let results = await firstValueFrom(forkJoin([citiesObservable, benefitsObservable, propertiesObservable]));

    let cityAndChecks = new Array<DataAndCheck<CityDto>>();
    results[0].forEach(city => {
      let cityAndCheck = new DataAndCheck<CityDto>(city);
      cityAndChecks.push(cityAndCheck);
    });

    let benefitAndChecks = new Array<DataAndCheck<BenefitDto>>();
    results[1].forEach(benefit => {
      let benefitAndCheck = new DataAndCheck<BenefitDto>(benefit);
      benefitAndChecks.push(benefitAndCheck);
    });

    this.cities = cityAndChecks;
    this.benefits = benefitAndChecks;
    this.properties = results[2];




    httpParams.keys().forEach(key => {
      switch (key) {
        case "rental-period": {
          let value = httpParams.get(key);
          if (value == "any" || value == "long-term" || value == "whole-season") {
            this.rentalPeriod = value;
          }
          break;
        }
        case "cities": {
          let values = httpParams.getAll(key);
          if (values) {
            values.forEach(city_ID => {

              let city = this.cities.find(s => s.Data.City_ID == parseInt(city_ID));
              if (city) {
                city.checked = true;
                this.selectedCities.push(city.Data);
              }
            });
          }
          break;
        }
        case "benefits": {
          let values = httpParams.getAll(key);
          if (values) {
            values.forEach(benefit_ID => {

              let benefit = this.benefits.find(s => s.Data.Benefit_ID == parseInt(benefit_ID));
              if (benefit) {
                benefit.checked = true;
                this.selectedBenefits.push(benefit.Data);
              }
            });
          }
          break;
        }
        case "bedroom-number": {
          let values = httpParams.getAll(key);
          if (values) {
            values.forEach(bedroomNumber => {
              switch (bedroomNumber) {
                case "0": {
                  this.studio = true;
                  this.selectedBedrooms.push('0');
                  break;
                }
                case "1": {
                  this.oneBedroom = true;
                  this.selectedBedrooms.push('1');
                  break;
                }
                case "2": {
                  this.twoBedrooms = true;
                  this.selectedBedrooms.push('2');
                  break;
                }
                case "3": {
                  this.threeBedrooms = true;
                  this.selectedBedrooms.push('3');
                  break;
                }
                case "4": {
                  this.fourBedrooms = true;
                  this.selectedBedrooms.push('4');
                  break;
                }
                case "5": {
                  this.fiveBedrooms = true;
                  this.selectedBedrooms.push('5');
                  break;
                }
              }

            });
          }
          break;
        }
        case "price-from": {
          let value = httpParams.get(key);
          if (value) {
            this.priceFrom = value;
          }
          break;
        }
        case "price-to": {
          let value = httpParams.get(key);
          if (value) {
            this.priceTo = value;
          }
          break;
        }
      }
      if (key == "") {

      }
    });
    let currentLanguage = this._translocoService.getActiveLang();

    if (this.priceFrom || this.priceTo) {
      this._translocoService.selectTranslateObject('searchMenuOptions.priceFromXToY', { x: this.priceFrom, y: this.priceTo }, currentLanguage).subscribe(result => {
        this.selectedRentPrice = result;
      });
    }
    this.trigger += 1;
  }

  previousPageUrl = '';
  nextPageUrl = '';
  totalPagesArray = new Array<number>();

  selectedCities = new Array<CityDto>();
  selectCity(city: DataAndCheck<CityDto>) {
    if (city.checked) {
      this.selectedCities.push(city.Data);
    } else {
      let index = this.selectedCities.indexOf(city.Data);
      this.selectedCities.splice(index, 1);
    }
    this.trigger += 1;
    console.log(this.selectedCities);
  }

  selectedBenefits = new Array<BenefitDto>();
  selectBenefit(benefit: DataAndCheck<BenefitDto>) {
    if (benefit.checked) {
      this.selectedBenefits.push(benefit.Data);
    } else {
      let index = this.selectedBenefits.indexOf(benefit.Data);
      this.selectedBenefits.splice(index, 1);
    }
    this.trigger += 1;
  }
  selectedBedrooms = new Array<string>();
  selectBedroomRent(value: string) {
    this.trigger += 1;
    if (!this.selectedBedrooms.includes(value)) {
      this.selectedBedrooms.push(value);
    } else {
      this.selectedBedrooms.splice(this.selectedBedrooms.indexOf(value), 1);
    }
  }

  rentalPeriod = 'any';
  rentalPeriodOnLoad = 'any';
  changeRentalPeriod(event: Event) {
    let target = event?.target as HTMLInputElement;
    this.rentalPeriod = target.value;
  }

  selectedRentPrice = "----";
  priceChangeRent() {
    let currentLanguage = this._translocoService.getActiveLang();

    if (this.priceFrom || this.priceTo) {
      this._translocoService.selectTranslateObject('searchMenuOptions.priceFromXToY', { x: this.priceFrom, y: this.priceTo }, currentLanguage).subscribe(result => {
        this.selectedRentPrice = result;
      });
    } else {
      this.selectedRentPrice = "----";
    }
  }

  studio = false;
  oneBedroom = false;
  twoBedrooms = false;
  threeBedrooms = false;
  fourBedrooms = false;
  fiveBedrooms = false;
  priceFrom = '';
  priceTo = '';

  CurrentSearch = 'Rent';
  statusRent: boolean = true;
  statusId: boolean = false;
  SetSearch(Search: string) {
    this.CurrentSearch = Search;
    if (Search == 'Rent' && this.statusRent == false) {
      this.statusRent = true;
      this.statusId = false;
    }
    else if (Search == 'Id' && this.statusId == false) {
      this.statusRent = false;
      this.statusId = true;
    }

  };
  searchProperties(pageNumber: number) {
    let params = new HttpParams();
    params = params.append("page-number", pageNumber);
    params = params.append("rental-period", this.rentalPeriod);

    this.selectedCities.forEach(city => {
      params = params.append("cities", city.City_ID);
    });

    this.selectedBenefits.forEach(benefit => {
      params = params.append("benefits", benefit.Benefit_ID);
    });

    if (this.studio)
      params = params.append("bedroom-number", 0);
    if (this.oneBedroom)
      params = params.append("bedroom-number", 1);
    if (this.twoBedrooms)
      params = params.append("bedroom-number", 2);
    if (this.threeBedrooms)
      params = params.append("bedroom-number", 3);
    if (this.fourBedrooms)
      params = params.append("bedroom-number", 4);
    if (this.fiveBedrooms)
      params = params.append("bedroom-number", 5);

    if (this.priceFrom != "")
      params = params.append("price-from", parseInt(this.priceFrom));
    if (this.priceTo != "")
      params = params.append("price-to", parseInt(this.priceTo));


    let url = this._router.url;
    if (url.indexOf("?") != -1) {
      url = this._router.url.substring(0, this._router.url.indexOf("?"));
    }
    this._router.navigateByUrl(url + '?' + params.toString());
  }

  getFirstPictureUrl(property: PropertyDto) {
    if (!property.Photos) {
      return "";
    }

    let maxPosition = Number.NEGATIVE_INFINITY;
    let index = 0;

    for (let j = 0; j < property.Photos.length; j++) {
      if (property.Photos[j].Position > maxPosition) {
        index = j;
        maxPosition = property.Photos[j].Position;
      }
    }

    if (property.Photos[index])
      return property.Photos[index].PhotoUrl;
    else
      return "";
  }

  currentDropdown: any;

  toggleDropdown(menuName: string) {
    if (this.currentDropdown === menuName) {
      this.currentDropdown = null; // close the dropdown menu
    } else {
      this.currentDropdown = menuName; // open the dropdown menu
    }
  }
}



