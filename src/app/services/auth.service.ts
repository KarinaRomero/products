import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Entities/user';
import { NavController, AlertController} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../Entities/login';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';
const TOKEN_LOGOUT_KEY = 'auth-token-logout';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private REST_API_SERVER = "http://localhost:8888/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  authenticationState = new BehaviorSubject(null);


  isLoggedIn = false;
  token: any;

  constructor(private nav: NavController, private http: HttpClient,
    private storage: Storage, private alertController:AlertController) {
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  public register(user: User) {
    let data = JSON.stringify({
      "name": { "value": user.name },
      "mail": { "value": user.email },
      "pass": { "value": user.pass }
    });
    return this.http.post(this.REST_API_SERVER + 'user/register?_format=json', data, this.httpOptions)
      .subscribe(data => {
        console.log("Register "+data);
        this.presentAlertConfirm("Success!", '/login');
      }, error => {
        console.log(error);
      });
  }

  public login(user: User) {
    let data = JSON.stringify({
      name: user.name,
      pass: user.pass
    });
    return this.http.post(this.REST_API_SERVER + 'user/login?_format=json', data, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        let login = Object.assign(new Login(), data);
        this.presentAlertConfirm("Success!", '/product');
        this.storage.set(TOKEN_KEY, login.csrf_token).then(
          () => {
            console.log('Data saved');
            this.storage.set(TOKEN_LOGOUT_KEY, login.logout_token).then(
              () => {
                console.log('Data saved');
                this.authenticationState.next(true);
              },
              error => console.error('Error storing item', error)
            );
          },
          error => console.error('Error storing item', error)
        );

      }, error => {
        console.log(error);
      });
  }

  async presentAlertConfirm(message:string, route:string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.nav.navigateRoot(route);
          }
        }
      ]
    });

    await alert.present();
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
