import { ProductService } from './../../../../../../@vex/services/product.service';
import { Product } from './../../interfaces/product.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vex-products-read',
  templateUrl: './products-read.component.html',
  styleUrls: ['./products-read.component.scss']
})
export class ProductsReadComponent implements OnInit {

  products: Product[];
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
      console.log(products);
    })
  }

}
