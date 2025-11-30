import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationDto } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private readonly baseUrl = 'http://localhost:8080/api/locations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LocationDto[]> {
    return this.http.get<LocationDto[]>(this.baseUrl);
  }
}
