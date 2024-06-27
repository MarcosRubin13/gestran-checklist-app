import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response && response.data.token) {
          sessionStorage.setItem('authToken', response.data.token);
        }
        return response;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('authToken');
  }

  getToken(): string {
    return sessionStorage.getItem('authToken') || '';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
