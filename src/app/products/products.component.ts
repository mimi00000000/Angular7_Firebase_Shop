import { ShoppingCartService } from "./../shopping-cart.service";
import { ActivatedRoute } from "@angular/router";
import { ProductServiceService } from "./../product-service.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import "rxjs/add/operator/switchMap";
import { Subscription } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productServiceService: ProductServiceService,
    private shoppingCartService: ShoppingCartService
  ) {
    productServiceService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get("category");
        this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      cart => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
