import {HttpService} from '../HTTP/http.service';
import { Component, OnInit } from '@angular/core';
import { Values } from '../Models/Values';

@Component({
  selector: 'app-values',
  templateUrl: './Values.component.html',
  styleUrls: ['./Values.component.css']
})
export class ValuesComponent implements OnInit {

  values: Values;

  constructor(private hhtpService: HttpService) {}

  ngOnInit(): void {
    this.Pobierz();
  }

  Pobierz() {
    this.hhtpService.GetVaues().subscribe(v => (this.values = v));
  }
}
