import { Component } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../Entities/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AuthService,
    private nav: NavController,
  ) {
    console.log("HERE");
  }
  ngOnInit() {

  }

  async registerPage() {
    this.nav.navigateRoot('/register');
  }

  async loginPage() {
    this.nav.navigateRoot('/login');
  }

}
