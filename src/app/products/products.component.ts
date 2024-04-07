import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule,
    NgClass,
  ],
  providers:[
    ProductService,AppStateService
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  constructor(private  productService:ProductService, private router:Router, public appState:AppStateService) { }
  ngOnInit(): void {
    console.log("initialisation");
    this.searchProduct();
    }
  handleCheckProduct(product: Product) {
    console.log("********"+product.id)
    this.productService.checkProduct(product)
      .subscribe({
        next:updateProduct=>{
        product.checked=!product.checked
        }
      });
  }
  searchProduct(){
    /*this.productService.getProducts()
      .subscribe({
        next :data=>this.products=data,
        error:err=>{
          console.log("erreur au niveau de chagement de data")
        }
      });
    this.products$=this.productService.getProducts();
    this.products$.forEach(value =>
    console.log(value.forEach(value1 =>
    console.log(value1))))*/
    this.productService.searchProduct(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize ).subscribe({
      next:value => {
        console.log(`la taille de pag est ${this.appState.productState.pageSize} `)
        this.appState.productState.products=value.body as Product[] ;
        console.log("*****"+this.appState.productState.products.toString());
        let totalProducts:number=parseInt(value.headers.get("X-Total-Count")!);
        console.log("tester"+totalProducts);
        this.appState.productState.totalPages=Math.floor(totalProducts/this.appState.productState.pageSize);
        if(totalProducts % this.appState.productState.pageSize != 0){
          this.appState.productState.totalPages+=1;
          console.log("total pages modulo"+this.appState.productState.totalPages)
        }
        else
          console.log("total pages simple"+this.appState.productState.totalPages)
      }, error:err => {
        console.error("warning in getProducts");
      }
    })
  }
  deleteProduct(product: Product) {
    if (confirm("Etes vous sure ? ")) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.appState.productState.products=this.appState.productState.products.filter((value:any) => value.id!=product.id);
      if(this.appState.productState.products.length==0){
        this.appState.productState.currentPage=this.appState.productState.currentPage-1;
        this.searchProduct();
      }
      else
        this.searchProduct()
    })
  }
  }

  /*public searchProducts() {
    this.currentPage=1;
    this.totalPages=0;
    this.productService.getProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
      next :value => {
        this.products=value as
        console.log(value.length);
        value.forEach(value1 => {
          console.log("tester"+value1.name)
        })
      },
      error :err =>
        console.log("la recherche ne fonctionne pas ")
    } )
  }*/

  handelGoToPage(page: number) {
    this.appState.productState.currentPage=page
    this.searchProduct()
  }
  handleEdit(product: Product) {
  this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
