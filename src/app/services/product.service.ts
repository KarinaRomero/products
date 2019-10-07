import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Product } from '../Entities/product';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private REST_API_SERVER = "http://localhost:8888/rest/products";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  nidSelected: number;

  constructor(private nav: NavController, private http: HttpClient, private alertController: AlertController) {
  }
  getProducts() {
    return this.http.get(`${this.REST_API_SERVER}`);
  }
  getDetails(id: number) {
    return this.http.get(`${this.REST_API_SERVER}/${id}?_format=json`);
  }
  updateProduct(product: Product) {
    let token = "";
    this.http.get('http://localhost:8888/rest/session/token?_format=json', { responseType: 'text' })
      .subscribe(data => {
        token = data;
        console.log(token);
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token',
            'X-CSRF-Token': token
          })
        };
        return this.http.patch(`http://localhost:8888/node/${product.nid}?_format=json`, this.httpOptions).subscribe(
          data => {
            console.log(data);
            this.presentAlertConfirm("Saved", 'product');
          }
        );
      })

  }
  setNidSelected(id: number) {
    this.nidSelected = id;
  }
  async presentAlertConfirm(message: string, route: string) {
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
}
