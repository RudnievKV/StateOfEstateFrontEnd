import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-search-commercial',
  templateUrl: './search-commercial.component.html',
  styleUrls: ['./search-commercial.component.scss']
})
export class SearchCommercialComponent {
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
      this.priceChangeSale();
      this.landFootageChangeRent();
      this.landFootageChangeSale();
      this.trigger = this.trigger + 1;
    });
  }
  languageChangeSubscription!: Subscription;
  trigger = 0;
  ngOnDestroy() {
    this.languageChangeSubscription.unsubscribe();
  }

  citiesRent!: Array<DataAndCheck<CityDto>>;
  benefitsRent!: Array<DataAndCheck<BenefitDto>>;
  propertiesRent!: PagedResponse<PropertyDto>;

  citiesSale!: Array<DataAndCheck<CityDto>>;
  benefitsSale!: Array<DataAndCheck<BenefitDto>>;
  propertiesSale!: PagedResponse<PropertyDto>;

  async ngOnInit() {


    let citiesObservable = this._cityService.GetAllCities();
    let benefitsObservable = this._benefitService.GetAllBenefits();

    let queryParams = this._activatedRoute.snapshot.queryParams;
    let httpParams = new HttpParams();
    httpParams = httpParams.appendAll(queryParams);




    httpParams = httpParams.set("page-size", 20);
    httpParams = httpParams.set("page-number", 1);
    httpParams = httpParams.set("type", "commercial");

    if (httpParams.has("rental-period")) {
      this.CurrentSearch = 'Rent';
      this.statusBuy = false;
      this.statusRent = true;
      this.statusId = false;
      this.rentalPeriod != httpParams.get("rental-period");
      this.propertyLink = "properties/r";
    }
    httpParams = httpParams.delete("rental-period");
    let propertiesSaleObservable = this._propertyService.SearchPropertiesPaged(httpParams);
    httpParams = httpParams.set("rental-period", this.rentalPeriod);
    let propertiesRentObservable = this._propertyService.SearchPropertiesPaged(httpParams);



    let currentPage = httpParams.get("page-number");
    if (currentPage) {
      httpParams = httpParams.set("page-number", parseInt(currentPage) + 1);
    }
    this.nextPageUrl = this._router.url + httpParams.toString();
    console.log(this.nextPageUrl);


    let results = await firstValueFrom(forkJoin([citiesObservable, benefitsObservable, propertiesRentObservable, propertiesSaleObservable]));

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

    this.citiesRent = cityAndChecks;
    this.citiesSale = structuredClone(cityAndChecks);
    this.benefitsRent = benefitAndChecks;
    this.benefitsSale = structuredClone(benefitAndChecks);
    this.propertiesRent = results[2];
    this.propertiesSale = results[3];


    queryParams = this._activatedRoute.snapshot.queryParams;
    httpParams = new HttpParams();
    httpParams = httpParams.appendAll(queryParams);

    if (httpParams.has("rental-period")) {
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

                let city = this.citiesRent.find(s => s.Data.City_ID == parseInt(city_ID));
                if (city) {
                  city.checked = true;
                  this.selectedCitiesRent.push(city.Data);
                }
              });
            }
            break;
          }
          case "benefits": {
            let values = httpParams.getAll(key);
            if (values) {
              values.forEach(benefit_ID => {

                let benefit = this.benefitsRent.find(s => s.Data.Benefit_ID == parseInt(benefit_ID));
                if (benefit) {
                  benefit.checked = true;
                  this.selectedBenefitsRent.push(benefit.Data);
                }
              });
            }
            break;
          }
          case "land-footage-to": {
            let value = httpParams.get(key);
            if (value) {
              this.landFootageToRent = value;
            }
            break;
          }
          case "land-footage-from": {
            let value = httpParams.get(key);
            if (value) {
              this.landFootageFromRent = value;
            }
            break;
          }
          case "price-from": {
            let value = httpParams.get(key);
            if (value) {
              this.priceFromRent = value;
            }
            break;
          }
          case "price-to": {
            let value = httpParams.get(key);
            if (value) {
              this.priceToRent = value;
            }
            break;
          }
        }
        if (key == "") {

        }
      });
    } else {
      // SALE
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

                let city = this.citiesSale.find(s => s.Data.City_ID == parseInt(city_ID));
                if (city) {
                  city.checked = true;
                  this.selectedCitiesSale.push(city.Data);
                }
              });
            }
            break;
          }
          case "benefits": {
            let values = httpParams.getAll(key);
            if (values) {
              values.forEach(benefit_ID => {

                let benefit = this.benefitsSale.find(s => s.Data.Benefit_ID == parseInt(benefit_ID));
                if (benefit) {
                  benefit.checked = true;
                  this.selectedBenefitsSale.push(benefit.Data);
                }
              });
            }
            break;
          }
          case "land-footage-to": {
            let value = httpParams.get(key);
            if (value) {
              this.landFootageToSale = value;
            }
            break;
          }
          case "land-footage-from": {
            let value = httpParams.get(key);
            if (value) {
              this.landFootageFromSale = value;
            }
            break;
          }
          case "price-from": {
            let value = httpParams.get(key);
            if (value) {
              this.priceFromSale = value;
            }
            break;
          }
          case "price-to": {
            let value = httpParams.get(key);
            if (value) {
              this.priceToSale = value;
            }
            break;
          }
        }
        if (key == "") {

        }
      });
    }
    let currentLanguage = this._translocoService.getActiveLang();

    if (this.priceFromRent || this.priceToRent) {
      this._translocoService.selectTranslateObject('searchMenuOptions.priceFromXToY', { x: this.priceFromRent, y: this.priceToRent }, currentLanguage).subscribe(result => {
        this.selectedRentPrice = result;
      });
    }
    if (this.priceFromSale || this.priceToSale) {
      this._translocoService.selectTranslateObject('searchMenuOptions.priceFromXToY', { x: this.priceFromSale, y: this.priceToSale }, currentLanguage).subscribe(result => {
        this.selectedSalePrice = result;
      });
    }

    if (this.landFootageFromSale || this.landFootageToSale) {
      this._translocoService.selectTranslateObject('searchMenuOptions.landFootageFromXToY', { x: this.landFootageFromSale, y: this.landFootageToSale }, currentLanguage).subscribe(result => {
        this.selectedLandFootageSale = result;
      });
    }
    if (this.landFootageFromRent || this.landFootageToRent) {
      this._translocoService.selectTranslateObject('searchMenuOptions.landFootageFromXToY', { x: this.landFootageFromRent, y: this.landFootageToRent }, currentLanguage).subscribe(result => {
        this.selectedLandFootageRent = result;
      });
    }

    this.trigger += 1;
  }

  previousPageUrl = '';
  nextPageUrl = '';
  totalPagesArray = new Array<number>();

  selectedSalePrice = "----";
  priceChangeSale() {
    let currentLanguage = this._translocoService.getActiveLang();

    if (this.priceFromSale || this.priceToSale) {
      this._translocoService.selectTranslateObject('searchMenuOptions.priceFromXToY', { x: this.priceFromSale, y: this.priceToSale }, currentLanguage).subscribe(result => {
        this.selectedSalePrice = result;
      });
    } else {
      this.selectedSalePrice = "----";
    }


    // if (this.priceFromSale != 0 && this.priceToSale == 0) {
    //   this.selectedPrice = this._translocoService.translateObject('searchMenuOptions.priceFromX', { x: this.priceFromSale }, currentLanguage);
    // }
    // else if (this.priceFromSale == 0 && this.priceToSale != 0) {
    //   this.selectedPrice = this._translocoService.translateObject('searchMenuOptions.priceToX', { x: this.priceFromSale }, currentLanguage);
    // }
    // else if (this.priceFromSale != 0 && this.priceToSale != 0) {

    // }
    // else {
    //   this.selectedPrice = "----";
    // }
  }

  selectedRentPrice = "----";
  priceChangeRent() {
    let currentLanguage = this._translocoService.getActiveLang();

    if (this.priceFromRent || this.priceToRent) {
      this._translocoService.selectTranslateObject('searchMenuOptions.priceFromXToY', { x: this.priceFromRent, y: this.priceToRent }, currentLanguage).subscribe(result => {
        this.selectedRentPrice = result;
      });
    } else {
      this.selectedRentPrice = "----";
    }


    // if (this.priceFromSale != 0 && this.priceToSale == 0) {
    //   this.selectedPrice = this._translocoService.translateObject('searchMenuOptions.priceFromX', { x: this.priceFromSale }, currentLanguage);
    // }
    // else if (this.priceFromSale == 0 && this.priceToSale != 0) {
    //   this.selectedPrice = this._translocoService.translateObject('searchMenuOptions.priceToX', { x: this.priceFromSale }, currentLanguage);
    // }
    // else if (this.priceFromSale != 0 && this.priceToSale != 0) {

    // }
    // else {
    //   this.selectedPrice = "----";
    // }
  }
  landFootageFromSale = "";
  landFootageFromRent = "";
  landFootageToSale = "";
  landFootageToRent = "";

  selectedLandFootageSale = "----";
  landFootageChangeSale() {
    let currentLanguage = this._translocoService.getActiveLang();

    if (this.landFootageFromSale || this.landFootageToSale) {
      this._translocoService.selectTranslateObject('searchMenuOptions.landFootageFromXToY', { x: this.landFootageFromSale, y: this.landFootageToSale }, currentLanguage).subscribe(result => {
        this.selectedLandFootageSale = result;
      });
    } else {
      this.selectedLandFootageSale = "----";
    }
  }

  selectedLandFootageRent = "----";
  landFootageChangeRent() {
    let currentLanguage = this._translocoService.getActiveLang();

    if (this.landFootageFromRent || this.landFootageToRent) {
      this._translocoService.selectTranslateObject('searchMenuOptions.landFootageFromXToY', { x: this.landFootageFromRent, y: this.landFootageToRent }, currentLanguage).subscribe(result => {
        this.selectedLandFootageRent = result;
      });
    } else {
      this.selectedLandFootageRent = "----";
    }
  }

  selectedCitiesSale = new Array<CityDto>();
  selectedCitiesRent = new Array<CityDto>();
  selectCitySale(city: DataAndCheck<CityDto>) {
    if (city.checked) {
      this.selectedCitiesSale.push(city.Data);
    } else {
      let index = this.selectedCitiesSale.indexOf(city.Data);
      this.selectedCitiesSale.splice(index, 1);
    }
    this.trigger += 1;
    console.log(this.selectedCitiesSale);
  }
  selectCityRent(city: DataAndCheck<CityDto>) {
    if (city.checked) {
      this.selectedCitiesRent.push(city.Data);
    } else {
      let index = this.selectedCitiesRent.indexOf(city.Data);
      this.selectedCitiesRent.splice(index, 1);
    }
    this.trigger += 1;
    console.log(this.selectedCitiesSale);
  }
  selectedBenefitsRent = new Array<BenefitDto>();
  selectedBenefitsSale = new Array<BenefitDto>();
  selectBenefitSale(benefit: DataAndCheck<BenefitDto>) {
    if (benefit.checked) {
      this.selectedBenefitsRent.push(benefit.Data);
    } else {
      let index = this.selectedBenefitsRent.indexOf(benefit.Data);
      this.selectedBenefitsRent.splice(index, 1);
    }
    this.trigger += 1;
  }
  selectBenefitRent(benefit: DataAndCheck<BenefitDto>) {
    if (benefit.checked) {
      this.selectedBenefitsSale.push(benefit.Data);
    } else {
      let index = this.selectedBenefitsSale.indexOf(benefit.Data);
      this.selectedBenefitsSale.splice(index, 1);
    }
    this.trigger += 1;
  }

  rentalPeriod = 'any';
  rentalPeriodOnLoad = 'any';
  changeRentalPeriod(event: Event) {
    let target = event?.target as HTMLInputElement;
    this.rentalPeriod = target.value;
  }


  priceFromSale = '';
  priceToSale = '';


  priceFromRent = '';
  priceToRent = '';


  searchRentProperties(pageNumber: number) {
    let params = new HttpParams();
    params = params.append("page-number", pageNumber);
    params = params.append("rental-period", this.rentalPeriod);

    this.selectedCitiesRent.forEach(city => {
      params = params.append("cities", city.City_ID);
    });

    this.selectedBenefitsRent.forEach(benefit => {
      params = params.append("benefits", benefit.Benefit_ID);
    });

    if (this.landFootageToRent != "")
      params = params.append("land-footage-to", parseInt(this.landFootageToRent));
    if (this.landFootageFromRent != "")
      params = params.append("land-footage-from", parseInt(this.landFootageFromRent));

    if (this.priceFromRent != "")
      params = params.append("price-from", parseInt(this.priceFromRent));
    if (this.priceToRent != "")
      params = params.append("price-to", parseInt(this.priceToRent));


    let url = this._router.url;
    if (url.indexOf("?") != -1) {
      url = this._router.url.substring(0, this._router.url.indexOf("?"));
    }
    this._router.navigateByUrl(url + '?' + params.toString());
  }
  searchSaleProperties(pageNumber: number) {
    let params = new HttpParams();
    params = params.append("page-number", pageNumber);
    params = params.append("for-sale", true);

    this.selectedCitiesSale.forEach(city => {
      params = params.append("cities", city.City_ID);
    });

    this.selectedBenefitsSale.forEach(benefit => {
      params = params.append("benefits", benefit.Benefit_ID);
    });

    if (this.landFootageToSale != "")
      params = params.append("land-footage-to", parseInt(this.landFootageToSale));
    if (this.landFootageFromSale != "")
      params = params.append("land-footage-from", parseInt(this.landFootageFromSale));

    if (this.priceFromSale != "")
      params = params.append("price-from", parseInt(this.priceFromSale));
    if (this.priceToSale != "")
      params = params.append("price-to", parseInt(this.priceToSale));


    let url = this._router.url;
    if (url.indexOf("?") != -1) {
      url = this._router.url.substring(0, this._router.url.indexOf("?"));
    }
    this._router.navigateByUrl(url + '?' + params.toString());
  }
  displayCityNameByProperty(propertyDto: PropertyDto) {
    if (propertyDto.Cities.length > 0) {
      return propertyDto.Cities[0].Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
    }
    return "";
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

  CurrentSearch = 'Buy';
  statusBuy: boolean = true;
  statusRent: boolean = false;
  statusId: boolean = false;
  propertyLink = "properties/s";
  SetSearch(Search: string) {
    this.CurrentSearch = Search;

    if (Search == 'Buy' && this.statusBuy == false) {
      this.statusBuy = true;
      this.statusRent = false;
      this.statusId = false;
      this.propertyLink = "properties/s";
    }
    else if (Search == 'Rent' && this.statusRent == false) {
      this.statusBuy = false;
      this.statusRent = true;
      this.statusId = false;
      this.propertyLink = "properties/r";
    }
    else if (Search == 'Id' && this.statusId == false) {
      this.statusBuy = false;
      this.statusRent = false;
      this.statusId = true;
    }

  };

  currentDropdown: any;

  toggleDropdown(menuName: string) {
    if (this.currentDropdown === menuName) {
      this.currentDropdown = null; // close the dropdown menu
    } else {
      this.currentDropdown = menuName; // open the dropdown menu
    }
  }
}
