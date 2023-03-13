import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LocalCityValue, CityCreateDto } from 'src/app/models/CityDtos/CityCreateDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import { LocalNeighborhoodValue, NeighborhoodCreateDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodCreateDto';
import { NeighborhoodDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodDto';
import { CityService } from 'src/app/services/city.service';
import { LocalService } from 'src/app/services/local.service';
import { NeighborhoodService } from 'src/app/services/neighborhood.service';

@Component({
  selector: 'app-neighborhood-add',
  templateUrl: './neighborhood-add.component.html',
  styleUrls: ['./neighborhood-add.component.scss']
})
export class NeighborhoodAddComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private neighborhoodService: NeighborhoodService,
    private cityService: CityService,
    private router: Router,
    private localService: LocalService,
  ) { }
  neighborhood!: NeighborhoodDto;
  neighborhoodNameEn = '';
  neighborhoodNameRu = '';
  neighborhoodNameTr = '';
  neighborhoodNameMe = '';
  id!: number;
  cities!: Array<CityDto>;
  selectedCity!: CityDto;
  async ngOnInit() {
    this.cities = await firstValueFrom(this.cityService.GetAllCities());
  }
  async Save() {
    let params = new HttpParams();
    params = params.set("page-size", 100);
    params = params.set("page-number", 1);
    let locals = await firstValueFrom(this.localService.GetLocalsPaged(params));
    console.log(locals);

    let localEnId = locals.Data.find(s => s.LocalizationCode == 'en')!.Local_ID;
    let localRuId = locals.Data.find(s => s.LocalizationCode == 'ru')!.Local_ID;
    let localTrId = locals.Data.find(s => s.LocalizationCode == 'tr')!.Local_ID;
    let localMeId = locals.Data.find(s => s.LocalizationCode == 'sr')!.Local_ID;

    let localEn = new LocalNeighborhoodValue(this.neighborhoodNameEn, localEnId);
    let localRu = new LocalNeighborhoodValue(this.neighborhoodNameRu, localRuId);
    let localTr = new LocalNeighborhoodValue(this.neighborhoodNameTr, localTrId);
    let localMe = new LocalNeighborhoodValue(this.neighborhoodNameMe, localMeId);

    let local_Neighborhoods = new Array<LocalNeighborhoodValue>();
    local_Neighborhoods.push(localEn);
    local_Neighborhoods.push(localRu);
    local_Neighborhoods.push(localTr);
    local_Neighborhoods.push(localMe);

    let cityCreateDto = new NeighborhoodCreateDto(this.selectedCity.City_ID, local_Neighborhoods);
    await firstValueFrom(this.neighborhoodService.CreateNeighborhood(cityCreateDto))
      .catch(error => {
        console.log(error);

      }).then(result => {
        this.router.navigateByUrl("admin/neighborhoods/view-neighborhoods");
      });

  }
  DisplayCityName(cityDto: CityDto) {
    return cityDto.Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
  }
  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}
