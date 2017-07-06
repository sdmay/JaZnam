import { Component, OnInit } from '@angular/core';
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
  user = {};
  y;
  x;
  z;
  a;
  sub;
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
    this.playGame();
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data =>   this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  timer() {
    let timer: any = Observable.timer(10, 1000);
    this.sub = timer.subscribe(t => this.tickerFunc(t));
  }
  playGame() {
    this.timer();
    this.playService.getWords().subscribe(
      data => {
        this.x = data;
        this.a = this.x.word.toLowerCase();
        this.words = {
          word: this.x.word.toLowerCase().split('').sort(function () {return 0.5 - Math.random()
          }).join('-')
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
      alert('guess again');
    } else {
      alert('oh yeah!');
      this.wonGame(this.auth.currentUser._id);

          }
    check.value = '';
  }
  lostGame(user) {
    console.log('you lose');
    console.log(this.auth.currentUser._id);
    this.userService.updateLoss(this.auth.currentUser._id).subscribe(
        res => this.toast.setMessage('account settings saved!', 'success'),
        error => console.log(error)
      );
    this.playGame();
  }
  wonGame(user) {
    if (this.ticks > 0) {
      console.log('You Win! ');
      console.log(this.auth.currentUser._id);
      this.userService.updateWins(this.auth.currentUser._id).subscribe(
        res => this.toast.setMessage('You win!', 'success'),
        error => console.log(error)
      );
      this.sub.unsubscribe();
      this.playGame();
    }
  }
  tickerFunc(tick) {
    this.ticks = 60 - tick;
    if (this.ticks === 0) {
      this.sub.unsubscribe();
     this.lostGame(this.auth.currentUser._id);
    }
  }
}
