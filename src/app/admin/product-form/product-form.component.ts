import { Router } from '@angular/router';
import { ProductServiceService } from './../../product-service.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(private router: Router, private categoryService: CategoryService, private productServiceService: ProductServiceService) {
    this.categories$ = categoryService.getCategories();
  }

  save(product) {
    this.productServiceService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
