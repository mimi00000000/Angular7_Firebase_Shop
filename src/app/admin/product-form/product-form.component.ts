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
  product: any = {};
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productServiceService: ProductServiceService) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productServiceService.get(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  save(product) {
    if (this.id) {
      this.productServiceService.update(this.id, product);
    } else {
      this.productServiceService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you wanna delete this product ?')) {
      this.productServiceService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {
  }

}
