import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.apiUrl);
  }

  getstudentById(payload: number): Observable<Student> {
    return this.http.get<Student>(`${environment.apiUrl}/${payload}`);
  }

  createStudent(payload:Student): Observable<Student> {
    return this.http.post<Student>(environment.apiUrl, payload);
  }

  updateStudent(student:Student): Observable<Student> {
    return this.http.put<Student>(
      `${environment.apiUrl}/${student.id}`,
      student
    );
  }

  deleteStudent(payload: number) {
    return this.http.delete(`${environment.apiUrl}/${payload}`);
  }
}
