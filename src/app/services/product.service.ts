import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + '/getallproducts');
  }

  get(id: any): Observable<any> {
    return this.http.get(this.baseUrl + '/productId/' + id);
  }

  create(data: any): Observable<any> {
    const body = '{ "item": ' + JSON.stringify(data) + '}';
    return this.http.post(this.baseUrl + '/addProduct', body);
  }

  update(id: any, data: any): Observable<any> {
    let body = {
      errorMessage: '',
      item: {
        productCode: data.productCode,
        productDescription: data.productDescription,
        price: data.price,
        name: data.name,
      },
    };
    return this.http.put(this.baseUrl + '/updateProduct', body);
  }

  delete(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('itemId', id);
    return this.http.delete(this.baseUrl + '/removeProduct', { params });
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl + '/removeAllProduct');
  }

  findByTitle(name: any): Observable<any> {
    return this.http.get(this.baseUrl + '/productName/' + name);
  }
}
