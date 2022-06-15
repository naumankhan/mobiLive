import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  
  // API URL
  apiURL = 'https://reqres.in/api/';
  
  
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Fetch employees list
  getEmployees(page: number): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + `users/?page=${page}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Fetch employee detail
  getEmployee(id: any): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + 'users/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Fetch employee resource
  getEmployeeResource(id: any): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + 'unknown/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
