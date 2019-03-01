import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bla';
  data = '';
  constructor(public http: HttpClient) {
    this.http.get('/bla').subscribe(
      (success: any) => {
        this.data = success;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
