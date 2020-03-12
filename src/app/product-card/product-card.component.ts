import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from 'src/app/models/products';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('showActions') showActions = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

}

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
*/
