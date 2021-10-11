import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from './models/movies';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
@ViewChild('stickHeader')  header: ElementRef;
 headerBGUrl: string;
 sticky = false;
 subs: Subscription[] = [];
 trending: Movies;
 popular: Movies;
 topRated: Movies;
 originals: Movies;
 nowPlaying: Movies;
 
  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };

constructor(private movie: MovieService){}

ngOnInit(): void {

  this.subs.push(this.movie.getTrending().subscribe(data => {
    this.trending = data;
    this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.trending.results[1].backdrop_path;
  }));



  this.subs.push(this.movie.getPopularMovies().subscribe(data => this.popular = data));
  this.subs.push(this.movie.getTopRated().subscribe(data => this.topRated = data));
  this.subs.push(this.movie.getOriginals().subscribe(data => this.originals = data));
  this.subs.push(this.movie.getNowPlaying().subscribe(data => this.nowPlaying = data));
}


ngOnDestroy(): void {
  this.subs.map(s =>s.unsubscribe());
}


@HostListener('window:scroll', ['$event'])
handleScroll() {
  const windowScroll = window.pageYOffset;

  if (windowScroll >= this.header.nativeElement.offsetHeight) {
    this.sticky = true;
  } else {
    this.sticky = false;
  }
}


}