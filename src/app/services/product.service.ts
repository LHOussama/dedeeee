import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }
  public searchProduct(keyword:string="",page:number=1,size:number=4){
    console.log("dedyevdtevydvedvetvdevdtedtevde")
    let param=new HttpParams().set("_page",page).set("_limit",size).set('name_like',keyword);
    return this.http.get<Array<Product>>("http://localhost:3000/products",{params:param,observe:"response"})
  }
  public checkProduct(product:Product):Observable<Product>{
    console.log("checkProducts");
    return  this.http.patch<Product>(`http://localhost:3000/products/${product.id}`,{checked:!product.checked})
  }
  public deleteProduct(product:Product){
    return this.http.delete(`http://localhost:3000/products/${product.id}`);
  }
  saveProduct(product: Product) {
    return this.http.post<Product>(`http://localhost:3000/products`,product)
  }
  /*public searchProducts(keyword: string,currentPage:number,sizePage:number): Observable<Product[]> {
    let params = new HttpParams().set('name_like', keyword).set("_page",currentPage).set("_limit",sizePage);
    return this.http.get<Product[]>('http://localhost:3000/products', { params: params });
  }*/
  getProductById(productId: number):Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/products/${productId}`)
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`, product);
  }

}
