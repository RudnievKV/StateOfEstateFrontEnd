import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import PagedResponse from '../models/PagedResponse';
import { PartnerCreateDto } from '../models/PartnerDtos/PartnerCreateDto';
import { PartnerDto } from '../models/PartnerDtos/PartnerDto';
import { PartnerUpdateDto } from '../models/PartnerDtos/PartnerUpdateDto';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetPartnersPaged(customParams: HttpParams): Observable<PagedResponse<PartnerDto>> {
    return this.http.get<PagedResponse<PartnerDto>>(`${this.apiUrl}api/partners`, {
      params: customParams
    });
  }
  GetPartner(id: number): Observable<PartnerDto> {
    return this.http.get<PartnerDto>(`${this.apiUrl}api/partners/${id}`)
  }
  GetAllPartners(): Observable<PartnerDto[]> {
    return this.http.get<PartnerDto[]>(`${this.apiUrl}api/partners/all`)
  }
  CreatePartner(partner: PartnerCreateDto): Observable<PartnerDto> {
    return this.http.post<PartnerDto>(`${this.apiUrl}api/partners`, partner);
  }
  UpdatePartner(partner: PartnerUpdateDto, id: number): Observable<PartnerDto> {
    return this.http.put<PartnerDto>(`${this.apiUrl}api/partners/${id}`, partner);
  }
  DeletePartner(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/partners/${id}`);
  }
  DeletePartners(customParams: HttpParams): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/partners`, {
      params: customParams
    });
  }
}
