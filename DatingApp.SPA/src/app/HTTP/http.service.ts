import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Values } from '../Modes/Values';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  GetVaues() {
    return this.http.get<Values>('http://localhost:5000/api/values');
  }
}
