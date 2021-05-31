import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDataTableComponent } from './products-data-table.component';

describe('ProductsDataTableComponent', () => {
  let component: ProductsDataTableComponent;
  let fixture: ComponentFixture<ProductsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
