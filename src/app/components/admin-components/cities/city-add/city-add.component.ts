import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { LocalCityValue, CityCreateDto } from 'src/app/models/CityDtos/CityCreateDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import { CityService } from 'src/app/services/city.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.scss']
})
export class CityAddComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private cityService: CityService,
    private router: Router,
    private localService: LocalService,
  ) { }
  city!: CityDto;
  cityNameEn = '';
  cityNameRu = '';
  cityNameTr = '';
  cityNameMe = '';
  id!: number;
  async ngOnInit() {

  }
  async DeleteCity() {
    let result = await firstValueFrom(this.cityService.DeleteCity(this.id));
    if (result == true) {
      this.router.navigateByUrl('admin/cities/view-cities')
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

    let localEn = new LocalCityValue(this.cityNameEn, localEnId);
    let localRu = new LocalCityValue(this.cityNameRu, localRuId);
    let localTr = new LocalCityValue(this.cityNameTr, localTrId);
    let localMe = new LocalCityValue(this.cityNameMe, localMeId);

    let local_Cities = new Array<LocalCityValue>();
    local_Cities.push(localEn);
    local_Cities.push(localRu);
    local_Cities.push(localTr);
    local_Cities.push(localMe);

    let cityCreateDto = new CityCreateDto(local_Cities);
    let result = await firstValueFrom(this.cityService.CreateCity(cityCreateDto));

  }
}
