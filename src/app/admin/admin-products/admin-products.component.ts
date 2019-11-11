import { Product } from 'src/app/models/products';
import { ProductServiceService } from './../../product-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular7-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  items: Product[] = [];
  tableResource: DataTableResource<Product>;
  itemCount: number;

  constructor(private productServiceService: ProductServiceService) {
    this.subscription = this.productServiceService.getAll().subscribe(products => {
      this.products = this.filteredProducts = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: any[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) { return; }
    this.tableResource.query(params)
      .then(items => this.items = items);
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
