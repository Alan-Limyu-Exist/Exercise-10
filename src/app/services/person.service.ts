import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:8080/api/v1/people';

  constructor(private http: HttpClient) {}

  getPeople(sortBy?: string, page: number = 0, size: number = 10): Observable<Person[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:pass')
    });

    return this.http.get<Person[]>(this.apiUrl, { params, headers });
  }

  createPerson(person: Person): Observable<Person[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:pass'),
      'Content-Type': 'application/json'
    });
  
    return this.http.post<Person[]>(this.apiUrl, person, { headers });
  }
  
  updatePerson(person: Person): Observable<Person[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:pass'),
      'Content-Type': 'application/json'
    });
  
    return this.http.put<Person[]>(this.apiUrl + "/" + person.uuid, person, { headers });
  }
}
