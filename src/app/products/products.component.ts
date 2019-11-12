import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductServiceService } from './../product-service.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories$;
  category: string;

  constructor(route: ActivatedRoute, private categoryService: CategoryService, private productServiceService: ProductServiceService) {
    productServiceService
        .getAll()
        .switchMap( products => {
            this.products = products;
            return route.queryParamMap;
        })
        .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) : this.products;
    });


    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
  }

}
