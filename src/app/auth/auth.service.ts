import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { TokenStorageService } from '../core/services/token-storage.service';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  login(credentials: LoginPayload) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap((res) => {
          this.tokenStorage.token = res.token;
        })
      );
  }

  logout() {
    this.tokenStorage.clear();
  }
}
