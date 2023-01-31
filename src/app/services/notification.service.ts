import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import NotificationCreateDto from '../models/NotificationDtos/NotificationCreateDto';
import NotificationDto from '../models/NotificationDtos/NotificationDto';
import NotificationUpdateDto from '../models/NotificationDtos/NotificationUpdateDto';
import PagedResponse from '../models/PagedResponse';

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
  GetNotification(id: number): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiUrl}api/notifications/${id}`)
  }
  GetAllNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiUrl}api/notifications/all`)
  }
  CreateNotification(notification: NotificationCreateDto): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(`${this.apiUrl}api/notifications`, notification);
  }
  UpdateNotification(notification: NotificationUpdateDto, id: number): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(`${this.apiUrl}api/notifications/${id}`, notification);
  }
  DeleteNotification(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/notifications/${id}`);
  }

}
