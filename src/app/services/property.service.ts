import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import PagedResponse from '../models/PagedResponse';
import { PropertyCreateDto } from '../models/PropertyDtos/PropertyCreateDto';
import { PropertyDto } from '../models/PropertyDtos/PropertyDto';
import { PropertyUpdateDto } from '../models/PropertyDtos/PropertyUpdateDto';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetPropertiesPaged(customParams: HttpParams): Observable<PagedResponse<PropertyDto>> {
    return this.http.get<PagedResponse<PropertyDto>>(`${this.apiUrl}api/properties`, {
      params: customParams
    });
  }
  GetProperty(id: number): Observable<PropertyDto> {
    return this.http.get<PropertyDto>(`${this.apiUrl}api/properties/${id}`)
  }
  GetAllProperties(): Observable<PropertyDto[]> {
    return this.http.get<PropertyDto[]>(`${this.apiUrl}api/properties/all`)
  }
  CreateProperty(formData: FormData): Observable<PropertyDto> {
    return this.http.post<PropertyDto>(`${this.apiUrl}api/properties`, formData);
  }
  UpdateProperty(property: PropertyUpdateDto, id: number): Observable<PropertyDto> {
    return this.http.put<PropertyDto>(`${this.apiUrl}api/properties/${id}`, property);
  }
  DeleteProperty(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/properties/${id}`);
  }
  DeleteProperties(customParams: HttpParams): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/properties`, {
      params: customParams
    });
  }
}
