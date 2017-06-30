import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { PlayService } from '../services/play.service'

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  user = {};
  string;
  words = [];
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
        this.words = data;
      },
      error => console.log(error),
      () => this.isLoading = false
    )
  }
scrambleWord(word) {

}
  checkWord() {
  }
  lostGame() {
  }
  wonGame() {
  }

}
