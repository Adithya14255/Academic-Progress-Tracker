import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5001';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mentor_login`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data`, data);
  }

  updateData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/data/${id}`, data);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/data/${id}`);
  }
}
