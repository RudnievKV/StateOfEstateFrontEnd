import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, forkJoin } from 'rxjs';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import { BenefitService } from 'src/app/services/benefit.service';
import { CityService } from 'src/app/services/city.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-search-rent',
  templateUrl: './search-rent.component.html',
  styleUrls: ['./search-rent.component.scss']
})
export class SearchRentComponent {

  textContent = 'Продажа Добра Вода № 2579. Продается дом (109м2) в поселке Добры Воды. Участок 500м2. Паркинг на 2 автомобиля. Резервуар для воды 20м3. До моря 1500 метров. На участке растут: миндаль, мушмула, виноград, смоква, лимон. Вид на море. 1этаж: гостиная, кухня, спальня, санузел, терраса 2 этаж: 2 спальни, санузел, терраса';
  symbolLimit = 110;

  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  selectedAll: any;
  channelDDList = [
    {
      "channelId": 0,
      "channelName": "SMS",
      "selected": false
    },
    {
      "channelId": 1,
      "channelName": "Voice",
      "selected": false
    },
    {
      "channelId": 2,
      "channelName": "FaceBook",
      "selected": false
    },
    {
      "channelId": 4,
      "channelName": "Twitter",
      "selected": false
    },
    {
      "channelId": 5,
      "channelName": "Push",
      "selected": false
    },
    {
      "channelId": 6,
      "channelName": "WeChat",
      "selected": false
    },
    {
      "channelId": 7,
      "channelName": "Skype For Business",
      "selected": false
    },
    {
      "channelId": 8,
      "channelName": "Email",
      "selected": false
    }
  ];
  constructor(
    private _benefitService: BenefitService,
    private _cityService: CityService,
    private _propertyService: PropertyService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  cities!: Array<DataAndCheck<CityDto>>;
  benefits!: Array<DataAndCheck<BenefitDto>>;

  async ngOnInit() {
    let citiesObservable = this._cityService.GetAllCities();
    let benefitsObservable = this._benefitService.GetAllBenefits();

    let results = await firstValueFrom(forkJoin([citiesObservable, benefitsObservable]));

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
  }

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

  selectAll() {
    for (var i = 0; i < this.channelDDList.length; i++) {
      this.channelDDList[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.selectedAll = this.channelDDList.every(function (item: any) {
      return item.selected == true;
    });
  }
  rentalPeriod = 'Any';
  changeRentalPeriod(event: Event) {
    let target = event?.target as HTMLInputElement;
    this.rentalPeriod = target.value;
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
  searchProperties() {
    let params = new HttpParams();
    params = params.set("page-size", 20);
    params = params.set("page-number", 1);
    params = params.set("rental-period", this.rentalPeriod);

    this.selectedCities.forEach(city => {
      params = params.set("cities", city.City_ID);
    });

    this.selectedBenefits.forEach(benefit => {
      params = params.set("benefits", benefit.Benefit_ID);
    });

    if (this.studio)
      params = params.set("bedroom-number", 0);
    if (this.oneBedroom)
      params = params.set("bedroom-number", 1);
    if (this.twoBedrooms)
      params = params.set("bedroom-number", 2);
    if (this.threeBedrooms)
      params = params.set("bedroom-number", 3);
    if (this.fourBedrooms)
      params = params.set("bedroom-number", 4);
    if (this.fiveBedrooms)
      params = params.set("bedroom-number", 5);

    if (this.priceFrom != "")
      params = params.set("price-from", parseInt(this.priceFrom));
    if (this.priceTo != "")
      params = params.set("price-to", parseInt(this.priceTo));

    let test = this._router.url;
    this._router.navigate(['./'], { relativeTo: this._activatedRoute, queryParams: params });

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



