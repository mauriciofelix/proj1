import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsEditComponent } from './products-edit.component';

import { MatDialogModule } from '@angular/material/dialog'; //Mauricio Felix
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IconModule } from '@visurel/iconify-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({  
  declarations: [ProductsEditComponent], //Mauricio Felix
  imports: [
    CommonModule,

    MatDialogModule, //Mauricio Felix
    MatIconModule,
    FlexLayoutModule,
    MatInputModule,
    MatDividerModule,
    MatDatepickerModule,
    IconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatNativeDateModule
  ], 
  entryComponents: [ProductsEditComponent] //Mauricio Felix
  
})
export class ProductsEditModule { }
