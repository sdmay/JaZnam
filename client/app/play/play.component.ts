import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { PlayService } from '../services/play.service'
import {stringDistance} from "codelyzer/util/utils";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  user = {};
  y;
  x;
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
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data =>   this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  playGame() {
    this.playService.getWords().subscribe(
      data => {
        this.x = data;
        this.y = this.x.word;
        console.log(this.y);
        this.words = {
          word: this.x.word.split('').sort(function(){return 0.5 - Math.random()}).join('')
        }
      },
      error => console.log(error),
      () => this.isLoading = false
    )
  }
  checkWord(check: HTMLInputElement) {
    if (check.value !== this.y) {
      alert('guess again');
    } else {
      alert('oh yeah!');
      this.playGame();
    }
    check.value = '';
  }
  lostGame() {
  }
  wonGame() {
  }

}
