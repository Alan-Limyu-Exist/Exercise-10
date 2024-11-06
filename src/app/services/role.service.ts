import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/api/v1/roles';

  constructor(private http: HttpClient) {}

  getRoles(sortBy?: string, page: number = 0, size: number = 10): Observable<Role[]> {

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:pass')
    });

    return this.http.get<Role[]>(this.apiUrl, { headers });
  }

  createRole(role: Role): Observable<Role[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:pass'),
      'Content-Type': 'application/json'
    });
  
    return this.http.post<Role[]>(this.apiUrl, role, { headers });
  }
}
