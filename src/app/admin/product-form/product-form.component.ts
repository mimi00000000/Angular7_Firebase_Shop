import { Router, ActivatedRoute } from '@angular/router';
import { ProductServiceService } from './../../product-service.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productServiceService: ProductServiceService) {
    this.categories$ = categoryService.getCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productServiceService.get(id).take(1).subscribe(p => this.product = p);
    }
  }

  save(product) {
    this.productServiceService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
