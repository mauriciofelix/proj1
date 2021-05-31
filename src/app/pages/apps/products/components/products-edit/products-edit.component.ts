import { Product } from './../../interfaces/product.interface';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import icStar from '@iconify/icons-ic/twotone-star';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icEmail from '@iconify/icons-ic/twotone-mail';
import icPerson from '@iconify/icons-ic/twotone-person';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import { scaleIn400ms } from '../../../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../../../@vex/animations/stagger.animation';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';//pasta verde

//import { productsData } from '../../../../../../static-data/products';
import { ProductService } from './../../../../../../@vex/services/product.service';
import { AlertService } from './../../../../../../@vex/services/alert.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export let productIdCounter = 50;

@Component({
  selector: 'vex-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
  template: "passed in data: ",
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ProductsEditComponent implements OnInit {
  criando: boolean = this.productService.criando;
  visualizando: boolean = this.productService.visualizando;
  editando: boolean = this.productService.editando;
  
  /*form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    quant:['', Validators.required],
    price:['', Validators.required],
    total:['']
  });*/

  //form: FormGroup;
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    code: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
    quant:new FormControl(null, Validators.required),
    price:new FormControl(null, Validators.required),
    total:new FormControl(null),
  });

  product: Product = {
    name:  '',
    code:  null,
    quant: null,
    price: null,
    total: null
  };
  products: Product[];
  carregando = false;

  icStar = icStar;
  icStarBorder = icStarBorder;
  icMoreVert = icMoreVert;
  icClose = icClose;
  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  icBusiness = icBusiness;
  icPerson = icPerson;
  icEmail = icEmail;
  icPhone = icPhone;

  constructor(@Inject(MAT_DIALOG_DATA) 
              //private data: { tipo: number}
              //public dialog: MatDialog, 
              private productId: Product['id'],
              private dialogRef: MatDialogRef<ProductsEditComponent>,
              private fb: FormBuilder,
              private alertService: AlertService,
              private productService: ProductService,  
              private router: Router) { }

  ngOnInit() {
    
    if (this.productId) {
      this.productService.readById(this.productId).subscribe(product =>{
        this.product = product
        this.form.patchValue(this.product); 
      })      
    }
  }   

  ngAfterViewInit(): void{
    if(this.productService.visualizando === true){
      this.form.disable();
    }    
  }

  load() {
    console.log('sessionStorage', sessionStorage);
    (sessionStorage.refresh == 'true' || !sessionStorage.refresh) 
        && location.reload();
    sessionStorage.refresh = false;
  }

  /*createForm(product: Product) {
    this.form = new FormGroup({
      name: new FormControl(product.name),
      code: new FormControl(product.code),
      quant: new FormControl(product.quant),
      price: new FormControl(product.price),
      total: new FormControl(product.total)      
    })
  }*/

  createProduct(): void{
      this.productService.create(this.product).subscribe(() => {
        Swal.fire({
          title: 'Produto criado com sucesso!',         
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ok!'
        }).then((result) => {
          if (result.isConfirmed) {    
            //this.load();         
            location.reload();
            //this.router.navigate(['/apps/products/table'])
          }
        })           
    })
  }

  updateProduct(): void {
      //alert('updateProduct: ');
      
      this.productService.update(this.product).subscribe(() => {        
        Swal.fire({
          title: 'Produto atualizado com sucesso!',         
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ok!'
        }).then((result) => {
          if (result.isConfirmed) {             
            location.reload();            
            //this.router.navigate(['/apps/products/table'])
          }
        })

    });
  }

  deleteProduct(): void {
      this.productService.delete(this.product.id).subscribe(() => {
      this.alertService.success("Produto excluido com sucesso!");
      location.reload();
      //this.router.navigate(['/apps/products/table'])      
    });
  }

  cancel(): void {
    this.router.navigate(['/apps/products/table'])
  }  

  save() {
    const form = this.form.value;
    console.log('save: '+this.form.value);
    if (!this.product) {
      this.product = {
        ...form,
        id: productIdCounter++
      };
    }

    this.product.name = form.name;
    this.product.code = form.code;
    this.product.quant = form.quant;
    this.product.price = form.price;
    this.product.total = form.total;

    this.dialogRef.close();
  }
}
