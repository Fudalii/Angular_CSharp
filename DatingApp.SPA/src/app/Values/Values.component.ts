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
  }

  Pobierz(value): void {
    this.hhtpService.GetVaues(value).subscribe( x => console.log(x));
    console.log(value);
  }
}
