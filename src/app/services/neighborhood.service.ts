import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import { NeighborhoodCreateDto } from '../models/NeighborhoodDtos/NeighborhoodCreateDto';
import { NeighborhoodDto } from '../models/NeighborhoodDtos/NeighborhoodDto';
import { NeighborhoodUpdateDto } from '../models/NeighborhoodDtos/NeighborhoodUpdateDto';
import PagedResponse from '../models/PagedResponse';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class NeighborhoodService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetNeighborhoodsPaged(customParams: HttpParams): Observable<PagedResponse<NeighborhoodDto>> {
    return this.http.get<PagedResponse<NeighborhoodDto>>(`${this.apiUrl}api/neighborhoods`, {
      params: customParams
    });
  }
  GetNeighborhood(id: number): Observable<NeighborhoodDto> {
    return this.http.get<NeighborhoodDto>(`${this.apiUrl}api/neighborhoods/${id}`)
  }
  GetAllNeighborhoods(): Observable<NeighborhoodDto[]> {
    return this.http.get<NeighborhoodDto[]>(`${this.apiUrl}api/neighborhoods/all`)
  }
  CreateNeighborhood(neighborhood: NeighborhoodCreateDto): Observable<NeighborhoodDto> {
    return this.http.post<NeighborhoodDto>(`${this.apiUrl}api/neighborhoods`, neighborhood);
  }
  UpdateNeighborhood(neighborhood: NeighborhoodUpdateDto, id: number): Observable<NeighborhoodDto> {
    return this.http.put<NeighborhoodDto>(`${this.apiUrl}api/neighborhoods/${id}`, neighborhood);
  }
  DeleteNeighborhood(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/neighborhoods/${id}`);
  }

}
