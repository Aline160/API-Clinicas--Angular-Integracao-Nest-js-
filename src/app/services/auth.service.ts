import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
  }


  // TODO: Mapear DTOs para retorno do Backend
  login(cpf: string, password: string): Observable<any[]> {
    return this.http.post<any>(`${environment.API_URL}/auth/login`, {
      cpf, password
    }).pipe((retry(1)));
  }

}
