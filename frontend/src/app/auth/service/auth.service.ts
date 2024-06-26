import { Observable, firstValueFrom, lastValueFrom, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const TOKEN_KEY = 'user_token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  isCurrentUser(): Observable<any> {
    return this.http.get<any>('me');
  }

  async isAuthorization(): Promise<boolean> {
    const source$ = this.isCurrentUser().pipe(take(1));
    const currentUser = await lastValueFrom(source$);
    if (currentUser && this.getToken()) {
      return true;
    }

    return false;
  }
  singin(login: {
    email?: string | null;
    senha?: string | null;
  }): Observable<any> {
    return this.http.post<any>('token', login);
  }
}
