import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
//import { ProductsReadComponent } from './components/products-read/products-read.component';


@NgModule({  
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ], declarations: [
    //ProductsReadComponent
  ]
})
export class ProductsModule { }
