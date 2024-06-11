import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5001';

  constructor(private http: HttpClient) {}

  getFacultyData(id:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/faculty/${id}`);
    
  }
  getMentorData(id:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mentor/${id}`);
    
  }

  postLoginFacultyData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  postLoginCourseMentorData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }
  postLoginDomainMentorData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }
  postLoginAdminData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }
  updateData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/data/${id}`, data);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/data/${id}`);
  }
}
