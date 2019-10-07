import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { User } from '../Entities/user';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private nav: NavController) {
    this.user = new User();
  }

  ngOnInit() {
  }

  register() {
    if (this.user.name != "" && this.user.pass != "" && this.user.email != "") {
      this.authService.register(this.user);
    }
  }
  cancel() {
    this.nav.navigateRoot('/home');
  }
}
