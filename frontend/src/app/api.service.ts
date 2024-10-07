import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = '/api';
  constructor(private http: HttpClient) {}

  loginMoodle(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/moodle_login`);
  }
  getFacultyCourseList(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/faculty_courses`, data);
  }
  getCoordinatorCourse(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/coordinator_courses`, data);
  }
  getMentorList(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mentor_list`, data);
  }
  getDomainMentorsInDepartment(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/domain_mentor_info`, data);
  }
  getCoordinatorsInDepartment(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/course_coordinator_info`, data);
  }
  getFacultyInCourse(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/faculty_course_info`, data);
  }
  getFacultyInDepartment(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/faculty_info`, data);
  }
  assignCourseUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/assign_course`, data);
  }
  assignCourseMentor(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/assign_mentor`, data);
  }
  assignDomainMentor(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/assign_domain_mentor`, data);
  }
  registerUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }
  getFacultyProgressData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/faculty_progress`, data);
  }
  getCourseProgressData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/course_progress`, data);
  }
  addTopicData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_topic`, data);
  }
  addCourseData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_course`, data);
  }
  getCourseData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses`, data);
  }
  getTopicData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/topics`, data);
  }
  updateCommentDetails(id: any, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/editcomment/${id}`, data);
  }
  updateHoursCompletedDetails(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/edithourscompleted`, data);
  }
  updateLinkDetails(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/editlink`, data);
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
  getFacultyData(id: any,course_code: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/faculty/${id}/${course_code}`);
  }
  getFacultyCompletedData(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/faculty_completed/${id}`);
  }
  getCourseMentorData(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/course_mentor/${id}`);
  }
  getDomainMentorData(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/domain_mentor/${id}`);
  }
}
