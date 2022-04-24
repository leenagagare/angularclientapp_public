import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  product: Product = {
    productCode: '',
    name: '',
    productDescription: '',
    price: '',
  };
  submitted = false;
  isError = false;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  saveproduct(): void {
    const data = {
      productCode: this.product.productCode,
      name: this.product.name,
      productDescription: this.product.productDescription,
      price: this.product.price,
    };

    this.productService.create(data).subscribe({
      next: (res) => {
        //console.log(res);
        if (
          res.errorMessage &&
          res.errorMessage != null &&
          res.errorMessage != undefined
        ) {
          this.isError = true;
          this.errorMessage = res.errorMessage;
        } else {
          this.isError = false;
          this.submitted = true;
        }
      },
      error: (e) => console.error(e),
    });
  }

  newproduct(): void {
    this.submitted = false;
    this.product = {
      productCode: '',
      name: '',
      productDescription: '',
      price: '',
    };
  }
}
