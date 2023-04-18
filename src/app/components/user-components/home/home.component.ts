import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom, forkJoin } from 'rxjs';
import { BenefitDto } from 'src/app/models/BenefitDtos/BenefitDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import PagedResponse from 'src/app/models/PagedResponse';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';
import { BenefitService } from 'src/app/services/benefit.service';
import { CityService } from 'src/app/services/city.service';
import { PropertyService } from 'src/app/services/property.service';
import Swiper, { Navigation } from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private _benefitService: BenefitService,
    private _cityService: CityService,
    private _propertyService: PropertyService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  citiesRent!: Array<DataAndCheck<CityDto>>;
  benefitsRent!: Array<DataAndCheck<BenefitDto>>;

  citiesSale!: Array<DataAndCheck<CityDto>>;
  benefitsSale!: Array<DataAndCheck<BenefitDto>>;

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

    this.citiesRent = cityAndChecks;
    this.citiesSale = structuredClone(cityAndChecks);
    this.benefitsRent = benefitAndChecks;
    this.benefitsSale = structuredClone(benefitAndChecks);

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

  selectedCitiesSale = new Array<CityDto>();
  selectedCitiesRent = new Array<CityDto>();
  selectCitySale(city: DataAndCheck<CityDto>) {
    if (city.checked) {
      this.selectedCitiesSale.push(city.Data);
    } else {
      let index = this.selectedCitiesSale.indexOf(city.Data);
      this.selectedCitiesSale.splice(index, 1);
    }
    console.log(this.selectedCitiesSale);
  }
  selectCityRent(city: DataAndCheck<CityDto>) {
    if (city.checked) {
      this.selectedCitiesRent.push(city.Data);
    } else {
      let index = this.selectedCitiesRent.indexOf(city.Data);
      this.selectedCitiesRent.splice(index, 1);
    }
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
  }
  selectBenefitRent(benefit: DataAndCheck<BenefitDto>) {
    if (benefit.checked) {
      this.selectedBenefitsSale.push(benefit.Data);
    } else {
      let index = this.selectedBenefitsSale.indexOf(benefit.Data);
      this.selectedBenefitsSale.splice(index, 1);
    }
  }

  rentalPeriod = 'any';
  rentalPeriodOnLoad = 'any';
  changeRentalPeriod(event: Event) {
    let target = event?.target as HTMLInputElement;
    this.rentalPeriod = target.value;
  }

  studioSale = false;
  oneBedroomSale = false;
  twoBedroomsSale = false;
  threeBedroomsSale = false;
  fourBedroomsSale = false;
  fiveBedroomsSale = false;
  priceFromSale = '';
  priceToSale = '';

  studioRent = false;
  oneBedroomRent = false;
  twoBedroomsRent = false;
  threeBedroomsRent = false;
  fourBedroomsRent = false;
  fiveBedroomsRent = false;
  priceFromRent = '';
  priceToRent = '';


  searchRentProperties() {
    let params = new HttpParams();
    params = params.append("page-number", 1);
    params = params.append("rental-period", this.rentalPeriod);

    this.selectedCitiesRent.forEach(city => {
      params = params.append("cities", city.City_ID);
    });

    this.selectedBenefitsRent.forEach(benefit => {
      params = params.append("benefits", benefit.Benefit_ID);
    });

    if (this.studioRent)
      params = params.append("bedroom-number", 0);
    if (this.oneBedroomRent)
      params = params.append("bedroom-number", 1);
    if (this.twoBedroomsRent)
      params = params.append("bedroom-number", 2);
    if (this.threeBedroomsRent)
      params = params.append("bedroom-number", 3);
    if (this.fourBedroomsRent)
      params = params.append("bedroom-number", 4);
    if (this.fiveBedroomsRent)
      params = params.append("bedroom-number", 5);

    if (this.priceFromRent != "")
      params = params.append("price-from", parseInt(this.priceFromRent));
    if (this.priceToRent != "")
      params = params.append("price-to", parseInt(this.priceToRent));


    let url = this._router.url;
    if (url.indexOf("?") != -1) {
      url = this._router.url.substring(0, this._router.url.indexOf("?"));
    }
    this._router.navigateByUrl(url + "/search-rent" + '?' + params.toString());
  }
  searchSaleProperties() {
    let params = new HttpParams();
    params = params.append("page-number", 1);

    this.selectedCitiesSale.forEach(city => {
      params = params.append("cities", city.City_ID);
    });

    this.selectedBenefitsSale.forEach(benefit => {
      params = params.append("benefits", benefit.Benefit_ID);
    });

    if (this.studioSale)
      params = params.append("bedroom-number", 0);
    if (this.oneBedroomSale)
      params = params.append("bedroom-number", 1);
    if (this.twoBedroomsSale)
      params = params.append("bedroom-number", 2);
    if (this.threeBedroomsSale)
      params = params.append("bedroom-number", 3);
    if (this.fourBedroomsSale)
      params = params.append("bedroom-number", 4);
    if (this.fiveBedroomsSale)
      params = params.append("bedroom-number", 5);

    if (this.priceFromSale != "")
      params = params.append("price-from", parseInt(this.priceFromSale));
    if (this.priceToSale != "")
      params = params.append("price-to", parseInt(this.priceToSale));


    let url = this._router.url;
    if (url.indexOf("?") != -1) {
      url = this._router.url.substring(0, this._router.url.indexOf("?"));
    }
    this._router.navigateByUrl(url + "/search-sell" + '?' + params.toString());
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
  SetSearch(Search: string) {
    this.CurrentSearch = Search;

    if (Search == 'Buy' && this.statusBuy == false) {
      this.statusBuy = true;
      this.statusRent = false;
      this.statusId = false;
    }
    else if (Search == 'Rent' && this.statusRent == false) {
      this.statusBuy = false;
      this.statusRent = true;
      this.statusId = false;
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







  //===============swiper
  display: any;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;

  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesOffsetBefore: -30,
      slidesOffsetAfter: -30,
      speed: 400,
      slidesPerView: 4,
      spaceBetween: 20,
      breakpoints: {
        // when window width is <= 767px (mobile)
        80: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        986: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20
        },

      }
    });



  }
}

