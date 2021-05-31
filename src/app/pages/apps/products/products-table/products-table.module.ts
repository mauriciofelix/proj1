import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';

import { ScrollbarModule } from '../../../../../@vex/components/scrollbar/scrollbar.module';
import { ContainerModule } from '../../../../../@vex/directives/container/container.module';

import { ProductsTableRoutingModule } from './products-table-routing.module';
import { ProductsTableComponent } from './products-table.component';

import { ProductsEditModule } from '../components/products-edit/products-edit.module';
import { ProductsReadModule } from '../components/products-read/products-read.module';
import { ProductsReadComponent } from '../components/products-read/products-read.component';
import { ProductsDataTableComponent } from './products-data-table/products-data-table.component';
//import { ProductsTableMenuComponent } from './products-table-menu/products-table-menu.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [ProductsTableComponent, ProductsDataTableComponent], //, ProductsTableMenuComponent - Mauricio Felix
  imports: [
    CommonModule,
    ProductsTableRoutingModule, //Mauricio Felix
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    MatDialogModule,
    ScrollbarModule,
    ProductsEditModule, //Mauricio Felix
    ProductsReadModule, //Mauricio Felix
    ReactiveFormsModule,
    ContainerModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ProductsTableModule {
}
