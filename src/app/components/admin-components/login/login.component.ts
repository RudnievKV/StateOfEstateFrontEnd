import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  IsLoggingIn = false;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('admin/dashboard')
    }
  }
  login(username: string, password: string) {
    this.IsLoggingIn = true;
    this.authService.login(username, password)
      .subscribe(
        {
          error: (e) => { alert("Неверный логин или пароль!"); },
          complete: () => { this.IsLoggingIn = false; this.router.navigateByUrl('admin/dashboard') }
        })
  }

}
