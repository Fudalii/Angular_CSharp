
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from './HTTP/http.service';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { ValuesComponent } from './Values/Values.component';

@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
