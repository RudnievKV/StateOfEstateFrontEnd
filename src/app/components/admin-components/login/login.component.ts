import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login(username: string, password: string) {
    this.IsLoggingIn = true;
    throw new Error('Method not implemented.');
  }
  hide = true;
  IsLoggingIn = false;
}
