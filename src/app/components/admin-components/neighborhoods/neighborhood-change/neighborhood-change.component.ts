import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { LocalCityValue } from 'src/app/models/CityDtos/CityCreateDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import { CityUpdateDto } from 'src/app/models/CityDtos/CityUpdateDto';
import { LocalNeighborhoodValue } from 'src/app/models/NeighborhoodDtos/NeighborhoodCreateDto';
import { NeighborhoodDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodDto';
import { NeighborhoodUpdateDto } from 'src/app/models/NeighborhoodDtos/NeighborhoodUpdateDto';
import { CityService } from 'src/app/services/city.service';
import { LocalService } from 'src/app/services/local.service';
import { NeighborhoodService } from 'src/app/services/neighborhood.service';

@Component({
  selector: 'app-neighborhood-change',
  templateUrl: './neighborhood-change.component.html',
  styleUrls: ['./neighborhood-change.component.scss']
})
export class NeighborhoodChangeComponent {
  private routeSub!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private neighborhoodService: NeighborhoodService,
    private router: Router,
    private cityService: CityService,
    private localService: LocalService,
  ) { }
  neighborhood!: NeighborhoodDto;
  neighborhoodNameEn: string = '';
  neighborhoodNameRu: string = '';
  neighborhoodNameTr: string = '';
  neighborhoodNameMe: string = '';
  id!: number;
  cities!: Array<CityDto>;
  selectedCity!: CityDto;
  async ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];
    });
    await firstValueFrom(this.neighborhoodService.GetNeighborhood(this.id))
      .catch(error => {
        console.log(error);
        this.router.navigateByUrl('admin/neighborhoods/view-neighborhoods');
      })
      .then(result => {
        if (result) {
          this.neighborhood = result;
        }
      });
    console.log(this.neighborhood);
    if (this.neighborhood == undefined) {
      //this.router.navigateByUrl('admin/cities/view-cities');
    }
    let enLocale = this.neighborhood.Local_Neighborhoods.find(s => s.Local.LocalizationCode == 'en');
    if (enLocale != undefined && enLocale.LocalNeighborhoodName != null) {
      console.log(enLocale.LocalNeighborhoodName);
      this.neighborhoodNameEn = enLocale.LocalNeighborhoodName;
    }
    let ruLocale = this.neighborhood.Local_Neighborhoods.find(s => s.Local.LocalizationCode == 'ru');
    console.log(ruLocale);
    if (ruLocale != undefined && ruLocale.LocalNeighborhoodName != null) {

      this.neighborhoodNameRu = ruLocale.LocalNeighborhoodName;
      console.log(this.neighborhoodNameRu);
    }
    let meLocale = this.neighborhood.Local_Neighborhoods.find(s => s.Local.LocalizationCode == 'sr');
    if (meLocale != undefined && meLocale.LocalNeighborhoodName != null) {
      this.neighborhoodNameMe = meLocale.LocalNeighborhoodName;
      console.log(meLocale.LocalNeighborhoodName);
    }
    let trLocale = this.neighborhood.Local_Neighborhoods.find(s => s.Local.LocalizationCode == 'tr');
    if (trLocale != undefined && trLocale.LocalNeighborhoodName != null) {
      this.neighborhoodNameTr = trLocale.LocalNeighborhoodName;
      console.log(trLocale.LocalNeighborhoodName);
    }
    this.cities = await firstValueFrom(this.cityService.GetAllCities());


    let city = this.cities.find(city => city.City_ID == this.neighborhood.City_ID);
    if (city != undefined) {
      this.selectedCity = city;
    }


  }
  async Delete() {
    let result = await firstValueFrom(this.neighborhoodService.DeleteNeighborhood(this.id));
    if (result == true) {
      this.router.navigateByUrl('admin/neighborhoods/view-neighborhoods');
    } else {
      alert("Ошибка! Удаление не произошло.");
    }
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

    let local_Cities = new Array<LocalNeighborhoodValue>();
    local_Cities.push(localEn);
    local_Cities.push(localRu);
    local_Cities.push(localTr);
    local_Cities.push(localMe);

    let cityUpdateDto = new NeighborhoodUpdateDto(this.selectedCity.City_ID, local_Cities);
    console.log(cityUpdateDto);
    await firstValueFrom(this.neighborhoodService.UpdateNeighborhood(cityUpdateDto, this.id))
      .catch(error => {
        console.log(error);
        //this.router.navigateByUrl('admin/cities/view-cities');
      })
      .then(result => {
        if (result) {
          this.router.navigateByUrl('admin/neighborhoods/view-neighborhoods');
        } else {

        }

      });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  DisplayCityName(cityDto: CityDto) {
    return cityDto.Local_Cities.find(element => element.Local.LocalizationCode == 'ru')?.LocalCityName;
  }
  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}
