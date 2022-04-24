import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    productCode: '',
    name: '',
    productDescription: '',
    price: '',
  };

  message = '';

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProduct(this.route.snapshot.params['productCode']);
    }
  }

  getProduct(id: string): void {
    this.ProductService.get(id).subscribe({
      next: (data) => {
        this.currentProduct = data.item;
        // console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateProduct(): void {
    this.message = '';

    this.ProductService.update(
      this.currentProduct.productCode,
      this.currentProduct
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.errorMessage
          ? res.errorMessage
          : 'This product was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  deleteProduct(): void {
    this.ProductService.delete(this.currentProduct.productCode).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/products']);
      },
      error: (e) => console.error(e),
    });
  }
}
