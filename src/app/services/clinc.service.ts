import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClincService {


  constructor(private http: HttpClient) { }

  getAllClinics(): Observable<any[]> {
    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${environment.API_URL}/list`, { headers }).pipe(
      retry(1)
    );
  }

  createNewClinic(data: any): Observable<any> {
    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${environment.API_URL}/list`, data, { headers });
  }


  deleteClinic(clinicId: number): Observable<void> {

    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<void>(`${environment.API_URL}/list/${clinicId}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao deletar clínica:', error);
        throw error;
      })
    );
  }

  loadByID(clinicId: any) {
    if (clinicId === null) {
      return EMPTY;
    } else {
      const token = localStorage.getItem('auth_token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get(`${environment.API_URL}/list/${clinicId}`, { headers }).pipe(take(1));
    }
  }


  update(clinicId: any, clinic: any) {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.patch(`${environment.API_URL}/list/${clinicId}`, clinic, { headers }).pipe(take(1));
  }

}
