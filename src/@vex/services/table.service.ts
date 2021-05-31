import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private http: HttpClient) { }
  getTableData(){
    return this.http.get<any>("http://localhost:3001/products");
  }  
}
