import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import PagedResponse from 'src/app/models/PagedResponse';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-cities-view',
  templateUrl: './cities-view.component.html',
  styleUrls: ['./cities-view.component.scss']
})
export class CitiesViewComponent {
  constructor(
    private cityService: CityService,
    private router: Router,

  ) { }
  citiesPagedResponse!: PagedResponse<CityDto>;
  citiesAndCheck = Array<CityDtoAndCheck>();
  selectedCities = Array<number>();
  loading: boolean = true;
  allSelected: boolean = false;

  async ngOnInit() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);

    this.citiesPagedResponse = await firstValueFrom(this.cityService.GetCitiesPaged(params));
    this.citiesPagedResponse.Data.forEach(city => {
      let cityAndCheck = new CityDtoAndCheck(city);
      this.citiesAndCheck.push(cityAndCheck);
    });
    this.loading = false;
    console.log(this.citiesAndCheck);
  }
  selectCity(id: number) {
    let selectedCity_ID = this.citiesAndCheck.findIndex(x => x.cityDto.City_ID == id);
    if (this.selectedCities.includes(id)) {
      let index = this.selectedCities.indexOf(id);
      this.selectedCities.splice(index, 1);
      this.citiesAndCheck[selectedCity_ID].checked = false;
    } else {
      this.selectedCities.push(id);
      this.citiesAndCheck[selectedCity_ID].checked = true;
    }

    if (this.selectedCities.length == this.citiesAndCheck.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    console.log(this.selectedCities);
  }
  selectAll() {
    if (this.allSelected == false) {
      this.citiesAndCheck.forEach(element => {
        element.checked = true;
        if (!this.selectedCities.includes(element.cityDto.City_ID)) {
          this.selectedCities.push(element.cityDto.City_ID);
        }
      });
      this.allSelected = true;
    } else {
      this.citiesAndCheck.forEach(element => {
        element.checked = false;
      });
      this.selectedCities = [];
      this.allSelected = false;
    }
  }
  DisplayCityName(cityDtoAndCheck: CityDtoAndCheck) {
    let city = cityDtoAndCheck.cityDto;
    return city.Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
  }

}
class CityDtoAndCheck {
  cityDto!: CityDto;
  checked!: boolean;
  constructor(cityDto: CityDto) {
    this.cityDto = cityDto;
    this.checked = false;
  }
}
