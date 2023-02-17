import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { CityCreateDto, LocalCityValue } from 'src/app/models/CityDtos/CityCreateDto';
import { CityDto } from 'src/app/models/CityDtos/CityDto';
import { CityUpdateDto } from 'src/app/models/CityDtos/CityUpdateDto';
import { LocalDto } from 'src/app/models/LocalDtos/LocalDto';
import { CityService } from 'src/app/services/city.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-city-change',
  templateUrl: './city-change.component.html',
  styleUrls: ['./city-change.component.scss']
})
export class CityChangeComponent {
  private routeSub!: Subscription;
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
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];
    });
    let cityPromise = firstValueFrom(this.cityService.GetCity(this.id))
      .catch(error => {
        console.log(error);
        this.router.navigateByUrl('admin/cities/view-cities');
      });
    let cityPromiseResult = await cityPromise;
    if (cityPromiseResult != null) {
      this.city = cityPromiseResult;
    }
    console.log(this.city);
    if (this.city == undefined) {
      //this.router.navigateByUrl('admin/cities/view-cities');
    }
    let enLocale = this.city.Local_Cities.find(s => s.Local.LocalizationCode == 'en');
    if (enLocale != undefined && enLocale.LocalCityName != null) {
      this.cityNameEn = enLocale.LocalCityName;
    }
    let ruLocale = this.city.Local_Cities.find(s => s.Local.LocalizationCode == 'ru');
    if (ruLocale != undefined && ruLocale.LocalCityName != null) {
      this.cityNameRu = ruLocale.LocalCityName;
    }
    let meLocale = this.city.Local_Cities.find(s => s.Local.LocalizationCode == 'sr');
    if (meLocale != undefined && meLocale.LocalCityName != null) {
      this.cityNameRu = meLocale.LocalCityName;
    }
    let trLocale = this.city.Local_Cities.find(s => s.Local.LocalizationCode == 'tr');
    if (trLocale != undefined && trLocale.LocalCityName != null) {
      this.cityNameRu = trLocale.LocalCityName;
    }
  }
  async DeleteCity() {
    let result = await firstValueFrom(this.cityService.DeleteCity(this.id));
    if (result == true) {
      this.router.navigateByUrl('admin/cities/view-cities');
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

    let cityUpdateDto = new CityUpdateDto(local_Cities);
    console.log(cityUpdateDto);
    let result = await firstValueFrom(this.cityService.UpdateCity(cityUpdateDto, this.id));

  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


  CurrentLanguage = 'Ru';
  SetLanguage(Language: string) {
    this.CurrentLanguage = Language;
  };
}
