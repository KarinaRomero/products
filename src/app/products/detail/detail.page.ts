import { Component, OnInit, Input } from '@angular/core';
import { Product } from "../../Entities/product";
import{ProductService} from "../../services/product.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  product: Product;
  host:string = 'http://localhost:8888';
  isReady = false;
  isEdit = false;

  constructor(private service:ProductService) {
    console.log(this.service.nidSelected);
    this.service.getDetails(this.service.nidSelected).subscribe((data: Product)=>{
      console.log(data);
      this.product = data[0];
      let urlImage = this.product.field_image_1;
      this.product.field_image_1 = this.host+urlImage;
      console.log(this.product);
      this.isReady = true;
    })
  }
  ngOnInit() {}

  buttonEdit() {
    this.isEdit = true;
  }
  save() {
    this.service.updateProduct(this.product);
  }

}
