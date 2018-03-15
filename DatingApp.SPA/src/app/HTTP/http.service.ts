import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Values } from '../Models/Values';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {  }


  GetVaues() {
      return this.http.get<Values>('http://localhost:5000/api/values');
    }


}
