import { Component, OnInit, EventEmitter } from '@angular/core';
//import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icSearch from '@iconify/icons-ic/twotone-search';
import icStar from '@iconify/icons-ic/twotone-star';



import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { TableColumn } from '../../../../../@vex/interfaces/table-column.interface';
import { contactsData } from '../../../../../static-data/contacts';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import { ContactsEditComponent } from '../components/contacts-edit/contacts-edit.component';
import { Contact } from '../interfaces/contact.interface';
import icMenu from '@iconify/icons-ic/twotone-menu'; 

/*import { Icon } from '@visurel/iconify-angular';
import icViewHeadline from '@iconify/icons-ic/twotone-view-headline';
import icHistory from '@iconify/icons-ic/twotone-history';
import icLabel from '@iconify/icons-ic/twotone-label';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';*/

//@Output() const filterChange = new EventEmitter<Contact[]>();
//@Output() const openAddNew = new EventEmitter<void>()
@Component({
  selector: 'vex-contacts-table',
  templateUrl: './contacts-table.component.html',
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ContactsTableComponent implements OnInit {

  searchCtrl = new FormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(
    debounceTime(10)
  );

  menuOpen = false;

  activeCategory: 'frequently' | 'starred' | 'all' | 'family' | 'friends' | 'colleagues' | 'business' = 'all';
  tableData = contactsData;
  tableColumns: TableColumn<Contact>[] = [
    {
      label: '',
      property: 'selected',
      type: 'checkbox',
      cssClasses: ['w-6']
    },
    /*{
      label: '',
      property: 'imageSrc',
      type: 'image',
      cssClasses: ['min-w-9']
    },*/
    {
      label: 'NAME',
      property: 'name',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'EMAIL',
      property: 'email',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'PHONE',
      property: 'phone',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    /*{
      label: '',
      property: 'starred',
      type: 'button',
      cssClasses: ['text-secondary', 'w-10']
    },*/
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
  //icPersonAdd = icPersonAdd;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(data, event): void {
    event.stopPropagation();
    const editDialogRef = this.dialog.open(ContactsEditComponent, {
      data: data
    });
  }

  teste(id?: Contact['id']){
    this.dialog.open(ContactsEditComponent, {
      data: id || null,
      width: '600px'
    });
  }

  openContact(id?: Contact['id']) {
    this.setData.prototype.dynamicVariable = true;
    this.dialog.open(ContactsEditComponent,{      
      data: id || null,      
      width: '600px'
    });
  }

  openAddNew() {
    this.dialog.open(ContactsEditComponent, {
      data: null,
      width: '600px'
    });
  }
   

  toggleStar(id: Contact['id']) {
    const contact = this.tableData.find(c => c.id === id);

    if (contact) {
      contact.starred = !contact.starred;
    }
  }

  setData(data: Contact[]) {
    this.tableData = data;
    this.menuOpen = false;
  }

  openMenu() {
    this.menuOpen = true;
  }
}
