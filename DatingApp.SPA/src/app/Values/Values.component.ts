import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Http/Http.service';
import { Values } from '../Modes/Values';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.less']
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
