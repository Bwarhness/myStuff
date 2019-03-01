import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootObject, Movie } from './interface';
import * as WebTorrent from 'webtorrent';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yts';
  movies:Movie[] = [];
  constructor(http:HttpClient){
    console.log(WebTorrent)
    const client = new WebTorrent();
    console.log(client);
    http.get('https://yts.am/api/v2/list_movies.json').subscribe(
      (p:RootObject) => {  
        this.movies = p.data.movies;
      }
    )
  }
}
