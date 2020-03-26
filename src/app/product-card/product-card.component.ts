import { Product } from "src/app/models/products";
import { ShoppingCartService } from "./../shopping-cart.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent {
  // tslint:disable-next-line:no-input-rename
  @Input("product") product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input("showActions") showActions = true;
  // tslint:disable-next-line:no-input-rename
  @Input("shoppingCart") shoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    return 0;
  }
}
