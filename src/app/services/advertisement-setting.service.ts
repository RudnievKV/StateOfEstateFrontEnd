import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import AdvertisementSettingDto from '../models/AdvertisementSettingDtos/AdvertisementSettingDto';
import AdvertisementSettingUpdateDto from '../models/AdvertisementSettingDtos/AdvertisementSettingUpdateDto';
import { BenefitCreateDto } from '../models/BenefitDtos/BenefitCreateDto';
import { BenefitDto } from '../models/BenefitDtos/BenefitDto';
import { BenefitUpdateDto } from '../models/BenefitDtos/BenefitUpdateDto';
import PagedResponse from '../models/PagedResponse';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class AdvertisementSettingService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetAdvertisementSettingsPaged(customParams: HttpParams): Observable<PagedResponse<AdvertisementSettingDto>> {
    return this.http.get<PagedResponse<AdvertisementSettingDto>>(`${this.apiUrl}api/advertisementsettings`, {
      params: customParams
    });
  }
  GetAdvertisementSetting(id: number): Observable<AdvertisementSettingDto> {
    return this.http.get<AdvertisementSettingDto>(`${this.apiUrl}api/advertisementsettings/${id}`)
  }
  UpdateAdvertisementSetting(advertisementSetting: AdvertisementSettingUpdateDto, id: number): Observable<AdvertisementSettingDto> {
    return this.http.put<AdvertisementSettingDto>(`${this.apiUrl}api/advertisementsettings/${id}`, advertisementSetting);
  }
  DeleteAdvertisementSetting(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/advertisementsettings/${id}`);
  }

}
