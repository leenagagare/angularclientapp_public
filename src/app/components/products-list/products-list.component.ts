import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  Products: Product[] = [];
  currentProduct: Product = new Product();
  currentIndex = -1;
  title = '';
  message = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private ProductService: ProductService) {}

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.ProductService.getAll().subscribe({
      next: (data) => {
        this.Products = data.items;
        this.count = data.items.length;
        //console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveProducts();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProducts();
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = new Product();
    this.currentIndex = -1;
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllProducts(): void {
    this.ProductService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.errorMessage
          ? res.errorMessage
          : 'This product was deleted successfully!';
        this.refreshList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveProductsByName();
  }
  retrieveProductsByName(): void {
    this.ProductService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.Products = [];
        this.page = 1;
        this.count = 0;
        this.pageSize = 3;
        this.Products = data.item;
        //console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
