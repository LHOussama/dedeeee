import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from "./dashboard/dashboard.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgForOf, ReactiveFormsModule, HttpClientModule, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions : Array<any>=[
    {title:"Home","route":"/home" ,icon:"bi bi-house-fill"},
    {title:"Products","route":"/products",icon :"bi bi-apple" },
    {title:"New Products","route":"/newproduct",icon:"bi bi-apple" }
    ];
  cuurentAction:any;
  setCurrentAction(action: any) {
    this.cuurentAction=action;
    console.log(action);
  }
}

