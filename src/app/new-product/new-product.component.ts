import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";
import {HttpClientModule} from "@angular/common/http";
@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    JsonPipe
  ],
  providers:[ProductService],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public productForm!:FormGroup;
  constructor(private fb:FormBuilder,private productServie:ProductService) {
  }

  ngOnInit(): void {
    this.productForm=this.fb.group({
      name:this.fb.control('',[Validators.required]),
      price:this.fb.control('',[Validators.required]),
      checked:this.fb.control(''),

    })
  }

  saveProduct() {
    let product:Product=this.productForm.value
    this.productServie.saveProduct(product).subscribe( {
      next:value => {
          alert(JSON.stringify(value));
      },error:err => {
        console.log("error dan la partie d ajout");
      }
    })
  }
}
