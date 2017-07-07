import { Component, OnInit, OnChanges } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { PlayService } from '../services/play.service'
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  // let song = '../assets/direstraits';
  user = {};
  song = 'assets/direstraits.mp3';
  y;
  x;
  z;
  a;
  b;
  sub;
  playing = true;
  guess = {
    guess: String
  };
dispose;
  ticks = 0;
  countdown;
  words = {
    word: String
  };
  isLoading = true;

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private playService: PlayService,
              private userService: UserService)  { }

  ngOnInit() {
    this.getUser();
    this.playGame();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data =>   this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  timer() {
    const timer: any = Observable.timer(10, 1000);
    this.sub = timer.subscribe(t => this.tickerFunc(t));
  }
  playGame() {
    this.timer();
    this.playService.getWords().subscribe(
      data => {
        this.x = data;
        this.a = this.x.word.toLowerCase();
        this.b = this.x.word.toLowerCase().split('').sort(function () {return 0.5 - Math.random()
        }).join('-');
        this.words = {
          word: this.b
        };
      },
      error => console.log(error),
      () => this.isLoading = false
    )
  }
  checkWord(check: HTMLInputElement) {
    this.z = check.value.toLowerCase();
    this.guess = this.z;
    if (this.z === '') {
      return;
    }
    if (this.z !== this.a) {
      alert('guess again');
    } else {
      alert('oh yeah!');
      this.wonGame(this.auth.currentUser);

          }
    check.value = '';
  }
  lostGame(user) {
    console.log('you lose ' + this.z);
    console.log(user);
    this.userService.updateLoss(user).subscribe(
        res => this.toast.setMessage('account settings saved!', 'success'),
        error => console.log(error)
      );
    this.getUser();
    this.playGame();
  }
  wonGame(user) {
    if (this.ticks > 0) {
      console.log('You Win! ' + this.z);
      console.log(user);
      this.userService.updateWins(user).subscribe(
        res => this.toast.setMessage('You win!', 'success'),
        error => console.log(error)
      );
      this.sub.unsubscribe();
      this.getUser();
      this.playGame();
    }
  }
  tickerFunc(tick) {
    this.ticks = 60 - tick;
    if (this.ticks === 0) {
      this.sub.unsubscribe();
     this.lostGame(this.auth.currentUser);
    }
  }
  playMusic(): any {
    console.log('Play');
    this.playing = true;
  }
  stopMusic(): any {
    console.log('Stop');
    this.playing = false;
  }
}
