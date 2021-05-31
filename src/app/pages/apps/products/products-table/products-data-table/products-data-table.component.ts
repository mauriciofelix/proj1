import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
//import {MatMenuModule} from '@angular/material/menu';

import { TableColumn } from '../../../../../../@vex/interfaces/table-column.interface';
import { stagger20ms } from '../../../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../../../@vex/animations/scale-fade-in.animation';
import { AlertService } from './../../../../../../@vex/services/alert.service';

import icSearch from '@iconify/icons-ic/twotone-search';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDeleteForever from '@iconify/icons-ic/twotone-delete-forever';

import { Product } from '../../interfaces/product.interface';
import { ProductsEditComponent } from '../../components/products-edit/products-edit.component';

@Component({ 
  selector: 'vex-products-data-table',
  templateUrl: './products-data-table.component.html',
  styleUrls: ['./products-data-table.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ],
  animations: [
    stagger20ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class ProductsDataTableComponent<T> implements OnInit, OnChanges, AfterViewInit {
  @Input() data: T[];
  @Input() columns: TableColumn<T>[];
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [5,10, 25, 50, 100,250];
  @Input() searchStr: string;

  @Output() toggleStar = new EventEmitter<Product['id']>();
  //@Output() openContact = new EventEmitter<Product['id']>();

  visibleColumns: Array<keyof T | string>;
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  icMoreVert = icMoreVert;
  icStar = icStar;
  icStarBorder = icStarBorder;
  icDeleteForever = icDeleteForever;
  icEdit = icEdit;  
  icSearch = icSearch;
  products: Product[];
  constructor(
    private alertService: AlertService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.visibleColumns = this.columns.map(column => column.property);
    }

    if (changes.data) {
      this.dataSource.data = this.data;
    }

    if (changes.searchStr) {
      this.dataSource.filter = (this.searchStr || '').trim().toLowerCase();
    }
  }

  public alertError(id: Product['id']): void{
    this.alertService.error('testes de alerta: '+id);
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
  

  emitToggleStar(event: Event, id: Product['id']) {
    event.stopPropagation();
    this.toggleStar.emit(id);    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /*openContact(id?: Contact['id']) {
    this.dialog.open(ContactsEditComponent, {
      data: id || null,
      width: '600px'
    });
  }*/
  openProduct(id?: Product['id']) {
    alert('116');
    this.dialog.open(ProductsEditComponent, {
      data: id || null,
      width: '600px'
    });
  }

}