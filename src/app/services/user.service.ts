import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import PagedResponse from '../models/PagedResponse';
import UserCreateDto from '../models/UserDtos/UserCreateDto';
import UserDto from '../models/UserDtos/UserDto';
import UserUpdateDto from '../models/UserDtos/UserUpdateDto';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetUsersPaged(customParams: HttpParams): Observable<PagedResponse<UserDto>> {
    return this.http.get<PagedResponse<UserDto>>(`${this.apiUrl}api/users`, {
      params: customParams
    });
  }
  GetUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}api/users/${id}`)
  }
  CreateUser(user: UserCreateDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}api/users`, user);
  }
  UpdateUser(user: UserUpdateDto, id: number): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}api/users/${id}`, user);
  }
  DeleteUser(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/users/${id}`);
  }
  DeleteUsers(customParams: HttpParams): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/users`, {
      params: customParams
    });
  }

}
