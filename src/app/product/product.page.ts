import { Component, OnInit} from '@angular/core';
import { Product } from "../Entities/product";
import{ProductService} from "../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  products = [];

  host:string = 'http://localhost:8888';
  constructor(private service:ProductService)
  { }

  ngOnInit() {
    this.service.getProducts().subscribe((data: any[])=>{
      console.log(data);
      this.products = data;
      this.products.forEach(element => {
        let temp = element.field_image_1;
        element.field_image_1 = new String(this.host+temp);
      });
    })
  }

    public buttonClick(event:any,id:number): void {
      console.log("BUTTON: "+id);
      console.log("BUTTON: "+event);
      this.service.setNidSelected(id);
    }

}
