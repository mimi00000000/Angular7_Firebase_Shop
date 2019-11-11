import { ProductServiceService } from './../../product-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productServiceService: ProductServiceService) {
    this.subscription = this.productServiceService.getAll().subscribe(
      products => this.products = this.filteredProducts = products);
  }

  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
