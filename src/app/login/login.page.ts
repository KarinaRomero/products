import { Component, OnInit } from '@angular/core';
import { User } from '../Entities/user';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User;
  constructor(
    private authService: AuthService,
    private nav: NavController) {
      this.user = new User();
    }

  ngOnInit() {
  }

  login() {
    console.log(this.user.pass+" "+this.user.name);
    this.authService.login(this.user);
  }

  cancel() {
    this.nav.navigateRoot('/home');
  }

}
