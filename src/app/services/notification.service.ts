import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import NotificationCreateDto from '../models/NotificationDtos/NotificationCreateDto';
import NotificationDto from '../models/NotificationDtos/NotificationDto';
import NotificationUpdateDto from '../models/NotificationDtos/NotificationUpdateDto';
import PagedResponse from '../models/PagedResponse';
import * as moment from 'moment';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }
  GetNotificationsPaged(customParams: HttpParams): Observable<PagedResponse<NotificationDto>> {
    return this.http.get<PagedResponse<NotificationDto>>(`${this.apiUrl}api/notifications`, {
      params: customParams
    });
  }
  @TransformDate
  GetNotification(id: number): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiUrl}api/notifications/${id}`)
  }
  @TransformDate
  GetAllNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiUrl}api/notifications/all`)
  }
  @TransformDate
  CreateNotification(notification: NotificationCreateDto): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(`${this.apiUrl}api/notifications`, notification);
  }
  @TransformDate
  UpdateNotification(notification: NotificationUpdateDto, id: number): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(`${this.apiUrl}api/notifications/${id}`, notification);
  }
  DeleteNotification(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/notifications/${id}`);
  }
  DeleteNotifications(customParams: HttpParams): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/notifications`, {
      params: customParams
    });
  }
}
export function TransformDate(target: any, key: any, descriptor: any) {
  const originalMethod = descriptor.value;
  descriptor.value = function () {
    return originalMethod.apply(this).pipe(
      map((obj) => Object.assign({}, obj, stringToDate(obj)))
    );
  }
  return descriptor;
}
const isDate = (s: any) => moment(s, moment.ISO_8601, true).isValid();

function stringToDate(obj: any) {
  return Object.keys(obj)
    .filter((key) => obj[key] && isDate(obj[key]))
    .map((key) => { obj[key] = moment(obj[key]).toDate() });
}
