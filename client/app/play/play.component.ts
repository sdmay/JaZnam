import { Component, OnInit, OnChanges, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { PlayService } from '../services/play.service'
import {Observable} from 'rxjs/Rx';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  // let song = '../assets/direstraits';
  user = {
    username: String,
    wins: Number,
    losses: Number
  };
  song = 'assets/direstraits.mp3';
  youLost;
  youWon;
  guessAgain;
  missedWords = [];
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

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private playService: PlayService,
              private userService: UserService,
              )  {}

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
    this.youLost = false;
    this.youWon = false;
    this.guessAgain = false;
    this.timer();
    this.playService.getWords().subscribe(
      data => {
        this.x = data;
        this.a = this.x.word.toLowerCase();
        console.log(this.a);
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
    if (this.z === '') {
      return;
    }
    if (this.z !== this.a) {
      console.log(this.z);
      this.missedWords.push(this.z);
      console.log(this.missedWords);
      this.guessAgain = true;
    } else {
      this.missedWords = [];
      }
      if (this.z === this.a) {
      console.log('pool ' + this.z);
      console.log('a ' + this.a);

        this.wonGame(this.user);
      }

    check.value = '';
  }
  lostGame(user) {
    console.log('you lose ' + this.a);
    console.log(user);
    this.youWon = false;
    this.youLost = true;
    this.userService.updateLoss(user).subscribe(
        res => this.toast.setMessage('account settings saved!', 'success'),
        error => console.log(error)
      );
    this.missedWords = [];
    console.log(this.missedWords);
    this.getUser();
  }
  wonGame(user) {
    if (this.ticks > 0) {
      console.log('You Win! ' + this.a);
      console.log(user);
      this.userService.updateWins(user).subscribe(
        res => this.toast.setMessage('You win!', 'success'),
        error => console.log(error)
      );
      this.guessAgain = false;
      this.youLost = false;
      this.youWon = true;
      this.sub.unsubscribe();
      this.getUser();
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
    this.playing = true;
  }
  stopMusic(): any {
    this.playing = false;
  }
}
