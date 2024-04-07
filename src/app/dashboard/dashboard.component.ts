import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers:[AppStateService,ProductService]})
export class DashboardComponent implements OnInit{
  constructor(public appStateService:AppStateService,public productService:ProductService) {
  }

  ngOnInit(): void {
    console.log("dashboard"+this.appStateService.productState.totalPages)
  }

}
