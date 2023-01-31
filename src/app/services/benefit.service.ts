import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import { BenefitCreateDto } from '../models/BenefitDtos/BenefitCreateDto';
import { BenefitDto } from '../models/BenefitDtos/BenefitDto';
import { BenefitUpdateDto } from '../models/BenefitDtos/BenefitUpdateDto';
import PagedResponse from '../models/PagedResponse';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class BenefitService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetBenefitsPaged(customParams: HttpParams): Observable<PagedResponse<BenefitDto>> {
    return this.http.get<PagedResponse<BenefitDto>>(`${this.apiUrl}api/benefits`, {
      params: customParams
    });
  }
  GetBenefit(id: number): Observable<BenefitDto> {
    return this.http.get<BenefitDto>(`${this.apiUrl}api/benefits/${id}`)
  }
  GetAllBenefits(): Observable<BenefitDto[]> {
    return this.http.get<BenefitDto[]>(`${this.apiUrl}api/benefits/all`)
  }
  CreateBenefit(benefit: BenefitCreateDto): Observable<BenefitDto> {
    return this.http.post<BenefitDto>(`${this.apiUrl}api/benefits`, benefit);
  }
  UpdateBenefit(benefit: BenefitUpdateDto, id: number): Observable<BenefitDto> {
    return this.http.put<BenefitDto>(`${this.apiUrl}api/benefits/${id}`, benefit);
  }
  DeleteBenefit(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/benefits/${id}`);
  }

}
