import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  providers:[ProductService]
})
export class EditProductComponent implements OnInit{
  public productId!:number;
  public productFormGroup!:FormGroup;
  constructor(private route:ActivatedRoute,private productService:ProductService,private fb:FormBuilder) {

  }
  ngOnInit(): void {
    this.productId=this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next:value => {
        this.productFormGroup=this.fb.group({
          id:this.fb.control(value.id),
          name:this.fb.control(value.name,Validators.required),
          price:this.fb.control(value.price,Validators.min(100)),
          checked:this.fb.control(value.checked),
        })
        console.log(value.name)
      },
      error:err => {
        console.error("erreur au niveau de modification")
      }
    })
  }

  updateProduct() {
    let product:Product=this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next:value => alert(JSON.stringify(value)),
      error:err => console.error("erreur au niveau de modification")
    });
  }
}
