import { MatPaginatorIntlPtBr } from './paginator-ptbr-i8n';
import { PageLayoutDemoModule } from './pages/ui/page-layouts/page-layout-demo/page-layout-demo.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { ProductsModule } from './pages/apps/products/products.module';
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatSnackBarModule,
    FormsModule,
    FlexLayoutModule,
    // Vex
    VexModule,
    CustomLayoutModule,
    ProductsModule
  ], exports: [    
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule    
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr},
    { provide: LOCALE_ID, useValue: 'pt-BR'},    
],
  bootstrap: [AppComponent]
})
export class AppModule { }
