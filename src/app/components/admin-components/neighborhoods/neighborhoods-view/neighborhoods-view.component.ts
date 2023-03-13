import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import DataAndCheck from 'src/app/models/DataAndCheck';
import { NeighborhoodDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodDto';
import PagedResponse from 'src/app/models/PagedResponse';
import { CityService } from 'src/app/services/city.service';
import { NeighborhoodService } from 'src/app/services/neighborhood.service';

@Component({
  selector: 'app-neighborhoods-view',
  templateUrl: './neighborhoods-view.component.html',
  styleUrls: ['./neighborhoods-view.component.scss']
})
export class NeighborhoodsViewComponent {
  constructor(
    private neighborhoodService: NeighborhoodService,
    private router: Router,
    private cityService: CityService,

  ) { }
  neighborhoodsPagedResponse!: PagedResponse<NeighborhoodDto>;
  neighborhoodsAndCheck = Array<DataAndCheck<NeighborhoodDto>>();
  cities = Array<CityDto>();
  selectedNeighborhoods = Array<number>();
  loading: boolean = true;
  allSelected: boolean = false;

  async ngOnInit() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);

    this.neighborhoodsPagedResponse = await firstValueFrom(this.neighborhoodService.GetNeighborhoodsPaged(params));
    this.neighborhoodsPagedResponse.Data.forEach(neighborhood => {
      let neighborhoodAndCheck = new DataAndCheck(neighborhood);
      this.neighborhoodsAndCheck.push(neighborhoodAndCheck);
    });

    this.getAllCities();


    this.loading = false;
    console.log(this.neighborhoodsAndCheck);
  }
  async getAllCities() {
    let City_IDs = Array<number>();
    this.neighborhoodsPagedResponse.Data.forEach(neighborhood => {
      City_IDs.push(neighborhood.City_ID);
    });
    if (City_IDs.length > 0) {
      let paramsCities = new HttpParams();
      paramsCities = paramsCities.appendAll({ "ids": City_IDs });

      this.cities = await firstValueFrom(this.cityService.GetCities(paramsCities));
    }
  }
  selectNeighborhood(id: number) {
    let selectedNeighborhood_ID = this.neighborhoodsAndCheck.findIndex(x => x.Data.Neighborhood_ID == id);
    if (this.selectedNeighborhoods.includes(id)) {
      let index = this.selectedNeighborhoods.indexOf(id);
      this.selectedNeighborhoods.splice(index, 1);
      this.neighborhoodsAndCheck[selectedNeighborhood_ID].checked = false;
    } else {
      this.selectedNeighborhoods.push(id);
      this.neighborhoodsAndCheck[selectedNeighborhood_ID].checked = true;
    }

    if (this.selectedNeighborhoods.length == this.neighborhoodsAndCheck.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    console.log(this.selectedNeighborhoods);
  }
  selectAll() {
    if (this.allSelected == false) {
      this.neighborhoodsAndCheck.forEach(element => {
        element.checked = true;
        if (!this.selectedNeighborhoods.includes(element.Data.Neighborhood_ID)) {
          this.selectedNeighborhoods.push(element.Data.Neighborhood_ID);
        }
      });
      this.allSelected = true;
    } else {
      this.neighborhoodsAndCheck.forEach(element => {
        element.checked = false;
      });
      this.selectedNeighborhoods = [];
      this.allSelected = false;
    }
  }
  DisplayNeighborhoodName(neighborhoodDtoAndCheck: DataAndCheck<NeighborhoodDto>) {
    let neighborhood = neighborhoodDtoAndCheck.Data;
    return neighborhood.Local_Neighborhoods.find(element => element.Local.LocalizationCode == 'ru')?.LocalNeighborhoodName;
  }
  DisplayCityName(neighborhoodDtoAndCheck: DataAndCheck<NeighborhoodDto>) {
    let neighborhood = neighborhoodDtoAndCheck.Data;
    return this.cities.find(city => city.City_ID == neighborhood.City_ID)?.Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
  }
  searchQuery = "";
  async Search() {
    this.loading = true;
    this.selectedNeighborhoods = [];
    this.allSelected = false;
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);
    params = params.set("search", this.searchQuery);

    this.neighborhoodsPagedResponse = await firstValueFrom(this.neighborhoodService.GetNeighborhoodsPaged(params));
    this.neighborhoodsAndCheck = [];
    this.neighborhoodsPagedResponse.Data.forEach(neighborhood => {
      let neighborhoodAndCheck = new DataAndCheck<NeighborhoodDto>(neighborhood);
      this.neighborhoodsAndCheck.push(neighborhoodAndCheck);
    });
    this.getAllCities();
    console.log(this.neighborhoodsPagedResponse);
    this.loading = false;
  }
  async DeleteSelectedNeighborhoods(selectAction: string) {
    console.log(selectAction);
    if (selectAction == "Delete" && this.selectedNeighborhoods.length > 0) {
      this.allSelected = false;
      let params = new HttpParams();

      params = params.appendAll({ "ids": this.selectedNeighborhoods });

      let response = await firstValueFrom(this.neighborhoodService.DeleteNeighborhoods(params));
      console.log(response);
      window.location.reload();
    }
  }
}
