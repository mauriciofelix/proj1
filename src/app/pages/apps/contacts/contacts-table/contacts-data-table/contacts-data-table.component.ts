import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from '../../../../../../@vex/interfaces/table-column.interface';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDeleteForever from '@iconify/icons-ic/twotone-delete-forever';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger20ms } from '../../../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../../../@vex/animations/fade-in-up.animation';
import { Contact } from '../../interfaces/contact.interface';
import { scaleFadeIn400ms } from '../../../../../../@vex/animations/scale-fade-in.animation';

import { ContactsEditComponent } from '../../components/contacts-edit/contacts-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from './../../../../../../@vex/services/alert.service';
import icSearch from '@iconify/icons-ic/twotone-search';
//import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'vex-contacts-data-table',
  templateUrl: './contacts-data-table.component.html',
  styleUrls: ['./contacts-data-table.component.scss'],
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
export class ContactsDataTableComponent<T> implements OnInit, OnChanges, AfterViewInit {
  @Input() data: T[];
  @Input() columns: TableColumn<T>[];
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [10, 20, 50];
  @Input() searchStr: string;

  @Output() toggleStar = new EventEmitter<Contact['id']>();
  //@Output() openContact = new EventEmitter<Contact['id']>();

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

  public alertError(id: Contact['id']): void{
    this.alertService.error('testes de alerta: '+id);
  }
  public alertInfo(id: Contact['id']): void{
    this.alertService.info('testes de alerta: '+id);
  }
  public alertSuccess(id: Contact['id']): void{
    this.alertService.success('testes de alerta: '+id);
  }

  public openEditUser(id: Contact['id']){
    this.alertService.error('testes de alerta: '+id);
  }
  public onDelete(id: Contact['id']){
    this.alertService.success('testes de alerta'+id);
  }
  

  emitToggleStar(event: Event, id: Contact['id']) {
    event.stopPropagation();
    this.toggleStar.emit(id);    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openContact(id?: Contact['id']) {
    this.dialog.open(ContactsEditComponent, {
      data: id || null,
      width: '600px'
    });
  }

}
