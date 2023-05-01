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
  selector: 'app-search-plots',
  templateUrl: './search-plots.component.html',
  styleUrls: ['./search-plots.component.scss']
})
export class SearchPlotsComponent {
  textContent = 'Продажа Добра Вода № 2579. Продается дом (109м2) в поселке Добры Воды. Участок 500м2. Паркинг на 2 автомобиля. Резервуар для воды 20м3. До моря 1500 метров. На участке растут: миндаль, мушмула, виноград, смоква, лимон. Вид на море. 1этаж: гостиная, кухня, спальня, санузел, терраса 2 этаж: 2 спальни, санузел, терраса';
  symbolLimit = 110;

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
    httpParams = httpParams.set("type", "land");


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
        case "land-footage-to": {
          let value = httpParams.get(key);
          if (value) {
            this.landFootageTo = value;
          }
          break;
        }
        case "land-footage-from": {
          let value = httpParams.get(key);
          if (value) {
            this.landFootageFrom = value;
          }
          break;
        }
      }
      if (key == "") {

      }
    });
    for (let i = 1; i <= this.properties.TotalPages; i++) {
      this.totalPagesArray.push(i);
    }

  }

  previousPageUrl = '';
  nextPageUrl = '';
  totalPagesArray = new Array<number>();

  displayCityAndCheckName(cityDtoAndCheck: DataAndCheck<CityDto>) {
    let city = cityDtoAndCheck.Data;
    return city.Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
  }
  displayCityName(cityDto: CityDto) {
    return cityDto.Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
  }
  displayBenefitAndCheckName(benefitDtoAndCheck: DataAndCheck<BenefitDto>) {
    let benefit = benefitDtoAndCheck.Data;
    return benefit.Local_Benefits.find(element => element.Local.LocalizationCode == 'ru')?.LocalBenefitName;
  }

  selectedCities = new Array<CityDto>();
  selectCity(city: DataAndCheck<CityDto>) {
    if (city.checked) {
      this.selectedCities.push(city.Data);
    } else {
      let index = this.selectedCities.indexOf(city.Data);
      this.selectedCities.splice(index, 1);
    }
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
  }

  priceFrom = '';
  priceTo = '';
  landFootageFrom = '';
  landFootageTo = '';

  CurrentSearch = 'Buy';
  statusRent: boolean = true;
  statusId: boolean = false;
  SetSearch(Search: string) {
    this.CurrentSearch = Search;
    if (Search == 'Buy' && this.statusRent == false) {
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

    this.selectedCities.forEach(city => {
      params = params.append("cities", city.City_ID);
    });

    this.selectedBenefits.forEach(benefit => {
      params = params.append("benefits", benefit.Benefit_ID);
    });

    if (this.priceFrom != "")
      params = params.append("price-from", parseInt(this.priceFrom));
    if (this.priceTo != "")
      params = params.append("price-to", parseInt(this.priceTo));

    if (this.landFootageTo != "")
      params = params.append("land-footage-to", parseInt(this.landFootageTo));
    if (this.landFootageFrom != "")
      params = params.append("land-footage-from", parseInt(this.landFootageFrom));


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

  statusBuy: boolean = true;

  currentDropdown: any;

  toggleDropdown(menuName: string) {
    if (this.currentDropdown === menuName) {
      this.currentDropdown = null; // close the dropdown menu
    } else {
      this.currentDropdown = menuName; // open the dropdown menu
    }
  }
}
