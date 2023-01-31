import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import { TranslationDto } from '../models/TranslationDtos/TranslationDto';
import { TranslationInputDto } from '../models/TranslationDtos/TranslationInputDto';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetTranslations(translationInput: TranslationInputDto): Observable<TranslationDto> {
    return this.http.post<TranslationDto>(`${this.apiUrl}api/translations`, translationInput)
  }

}
