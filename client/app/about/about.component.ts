import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { element } from 'protractor';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(public auth: AuthService) { }
  printAll<T>(args: T[]) {
    args.forEach((element) => console.log(element));
  }

}
