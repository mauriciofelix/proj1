import { Component, OnInit, EventEmitter, AfterViewInit, ViewChild, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';

import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

import { TableService } from './../../../../../@vex/services/table.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Page, PageRequest } from '../../../../../@vex/utils/Paginations'; 

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ScrollbarModule } from './../../../../../@vex/components/scrollbar/scrollbar.module';

//import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icSearch from '@iconify/icons-ic/twotone-search';
import icStar from '@iconify/icons-ic/twotone-star';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDeleteForever from '@iconify/icons-ic/twotone-delete-forever'; 
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { TableColumn } from '../../../../../@vex/interfaces/table-column.interface';
import { productsData } from '../../../../../static-data/products';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import { ProductsEditComponent } from '../components/products-edit/products-edit.component';

import icMenu from '@iconify/icons-ic/twotone-menu'; 
import { Router } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductService } from '../../../../../@vex/services/product.service';

import { AlertService } from '../../../../../@vex/services/alert.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { PageQuery } from 'src/@vex/utils/Paginations';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface PeriodicElement {
  id?: number;  
  name: string;
  code?: number;
  quant?: number;
  price?: number;
  total?: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    name: "Televisão 55\" 2021",
    code: 221234,
    quant: 2,
    price: 3500,
    total: 7000,
  },
  {
    id: 3,
    name: "Fogão 6 bocas",
    code: 331244,
    quant: 3,
    price: 1500,
    total: 4500
  },
  {
    id: 4,
    name: "Geladeira duplex",
    code: 412321,
    quant: 1,
    price: 2500,
    total: 10000
  },
  {
    id: 6,
    name: "Maquina de lavar",
    code: 445322,
    quant: 4,
    price: 2500,
    total: 10000    
  },
  {
    id: 8,
    name: "Testes",
    code: 1515151515,
    quant: 10,
    price: 45,
    total: 450    
  },
  {
    id: 9,
    name: "teste",
    code: 123456,
    quant: 100,
    price: 10,
    total: 1000    
  }
];


//type NewType = MatTableDataSource<Product>;

//@Output() const filterChange = new EventEmitter<Product[]>();
//@Output() const openAddNew = new EventEmitter<void>()

@Component({
  selector: 'vex-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ProductsTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'name', 'code', 'quant', 'price', 'total', 'action'];
  dataSource = new MatTableDataSource<Product>();


  ////displayedColumns: string[] = ['id', 'name', 'code', 'quant', 'price', 'total', 'action'];//
  //dataSource: new NewType;//page.content Produtos json-server
  ////dataSource: MatTableDataSource<Product>;//page.content Produtos json-server
  //dataSource = new MatTableDataSource(ELEMENT_DATA);//dataSource Filtro e Ordenar
  page: Page<Product[]> = new Page([], 0);
  carregando = false;

  escolha: number = 11;

  isReadOnly = false;
  num = 1;
  pageEvent: PageEvent;
  sortEvent: Sort;
  formGroupPesquisa: FormGroup;
  dynamicVariable = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ////@ViewChild(MatTable) table!: MatTable<Product>;
  
  searchCtrl = new FormControl();  
  
  menuOpen = false;
  products: Product[];
  tableData = productsData;
  tableColumns: TableColumn<Product>[] = [
    {
      label: '',
      property: 'selected',
      type: 'checkbox',
      cssClasses: ['w-6']
    },   
    {
      label: 'NOME',
      property: 'name',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'CÓDIGO',
      property: 'code',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'QUANTIDADE',
      property: 'quant',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'VALOR UN.',
      property: 'price',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'VALOR TOT.',
      property: 'total',
      type: 'text',
      cssClasses: ['text-secondary']
    },   
    {
      label: '',
      property: 'menu',
      type: 'button',
      cssClasses: ['text-secondary', 'w-10']
    },
  ];

  icStar = icStar;
  icSearch = icSearch;
  icContacts = icContacts;
  icMenu = icMenu;
  icMoreVert = icMoreVert;
  icEdit = icEdit; 
  icDeleteForever = icDeleteForever;  
  variable: boolean;
  


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog, 
    private productService: ProductService,
    private alertService: AlertService,
    private tableService: TableService,
    private httpClient: HttpClient,
    private router: Router
    ) {
      ////const user: Product[] = [];
      ////this.dataSource = new MatTableDataSource(user);//page.content Produtos json-server
     }
      criando: boolean = this.productService.criando;
      visualizando: boolean = this.productService.visualizando;
      editando: boolean = this.productService.editando; 

    /****applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }****/

  ngOnInit() {
    this.num = 1;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.httpClient.get('http://localhost:3001/products')
      .subscribe((produtos: Product[]) => {
        this.dataSource.data = produtos;
      });


    /*this.httpClient.get('http://localhost:3001/products')
      .subscribe((products: Product[]) => {
        this.dataSource.data = products;
       });*/
    /*this.tableService.getTableData()
    .subscribe(res=>{
      console.log(res);
      this.dataSource = new MatTableDataSource<Product>(res);
    });
    this.formGroupPesquisa = this.formBuilder.group({
      nome: [null],
    });
    this.listarProdutos(); */   
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  limparPesquisa(){    
    this.formGroupPesquisa.reset();
    this.listarProdutos();
  }

  listarProdutos(){
    this.carregando = true;
    const queryAdicional = new Map();
    if(this.formGroupPesquisa.value.nome){
      console.log();
      queryAdicional.set("name_like", this.formGroupPesquisa.value.nome);
    }
    /*this.productService.read(
      new PageRequest(
      {
        pageNumber: this.pageEvent? this.pageEvent.pageIndex: 0,
        pageSize: this.pageEvent? this.pageEvent.pageSize: 5
      },
      {
        property: this.pageEvent?this.sortEvent.active: "id",
        direction: this.pageEvent?this.sortEvent.direction: "asc"
      },
      queryAdicional
      )
    ).pipe(
      take(1)
    )
    .subscribe(
      page => {
        this.page = page;
        this.carregando = false;
      },
      error => {
        this.page = new Page([], 0); //array vazio com zero elementos
        this.carregando = false;
      }
    );*/
  }
  
  openDialog(data, event): void {
    alert('openDialog 298:');
    event.stopPropagation();
    const editDialogRef = this.dialog.open(ProductsEditComponent, {
      data: data
    });
  }

  deleteProduct(id?: Product['id']): void {
    Swal.fire({
      title: 'Deseja realmente remover esse produto?',
      text: "Você não será capaz de reverter!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe(() => {
          Swal.fire({
            title: 'Seu produto foi deletado!',         
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ok!'
          }).then((result) => {
            if (result.isConfirmed) {             
              window.location.reload();
              //this.router.navigate(['/apps/products/table'])
            }
          }) 
        });         
      }
    })      
  }

  cancel(): void {
    this.router.navigate(['/apps/products/table']);
  }  

  openProduct(id?: Product['id'], escolha?: number) { 
    //alert('openProduct: '+escolha);
    if(escolha == 2){
      this.isReadOnly = true;
      this.variable = true;
      this.productService.editando = true;
      this.productService.criando = false;
      this.productService.visualizando = false;
      //alert('editando: '+this.productService.editando);
    }else{
      this.isReadOnly = false;
      this.variable = false;
      this.productService.editando = false;
      this.productService.criando = false;
      this.productService.visualizando = true;  
      //alert('editando: '+this.productService.editando);
    }
        
    this.dialog.open(ProductsEditComponent,{       
      data:  id || null,          
      width: '600px',
      //data: {id: id || null, dialogTitle: title, dialogText: text}
    });
    //alert('openProduct this.isReadOnly: '+this.isReadOnly);

  }  
 
  openAddNew(escolha?: number) {
    //alert('openAddNew: '+escolha);
    this.productService.editando = false;
    this.productService.criando = true;
    this.productService.visualizando = false;
    this.isReadOnly = true;
    this.num = 1;
    this.dialog.open(ProductsEditComponent, {
      data: null,
      width: '600px'
    });    
    //alert('openAddNew this.isReadOnly: '+this.isReadOnly);
  }

  setData(data: Product[]) {
    this.tableData = data;
    this.menuOpen = false;
  }

  openMenu() {
    this.menuOpen = true;
  }

  public alertError(id: Product['id']): void{
    this.isReadOnly = !this.isReadOnly;
  }

  public alertInfo(id: Product['id']): void{
    this.alertService.info('testes de alerta: '+id);
  }

  public alertSuccess(id: Product['id']): void{
    this.alertService.success('testes de alerta: '+id);
  }

  public openEditUser(id: Product['id']){
    this.alertService.error('testes de alerta: '+id);
  }

  public onDelete(id: Product['id']){
    this.alertService.success('testes de alerta'+id);
  }
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
