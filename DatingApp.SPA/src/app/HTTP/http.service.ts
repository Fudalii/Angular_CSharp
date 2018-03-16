import {RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Values } from '../Modes/Values';


@Injectable()
export class HttpService {
  URL_Fiabro = "http://192.168.100.26:80/api/devices/55/action/";

  Fibaro_body = {
    id: 0,
    jsonrpc: "2.0",
    result: {
      result: 0
    }
  };

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa("fudalikamil@hotmail.com:7595153Kamil!!"),
      'Access-Control-Allow-Headers': 'x-auth, content-type'
    })
  };

  constructor(private http: HttpClient) {}

  GetVaues(action: string) {
    return this.http.post(
      this.URL_Fiabro + action,
      this.Fibaro_body,
      this.httpOptions
    );
  }
}
