import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes  = [
  {
    path: '',
    children: [   
      {
        path: 'grid',
        loadChildren: () => import('./products-table/products-table.module').then(m => m.ProductsTableModule)
      },   
      {
        path: 'table',
        loadChildren: () => import('./products-table/products-table.module').then(m => m.ProductsTableModule)
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class ProductsRoutingModule { }
