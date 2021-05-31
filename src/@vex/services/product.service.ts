import { Page, QueryBuilder } from '../utils/Paginations';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Product } from '../../app/pages/apps/products/interfaces/product.interface';


@Injectable({ //decorator a classe pode ser injetada em outras classes
  providedIn: 'root' //singleton: padrão de projeto uma única inicialização
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";
  filterValue: any;

  criando: boolean = false;
  editando: boolean = false;
  visualizando: boolean = false;

  constructor(
    private snackBar: MatSnackBar, //b
    private http: HttpClient //b
    ) { } //auto import

  showOnConsole(msg: string):void{
    console.log(msg);
  }

  showMessage(msg: string, isError: boolean=false):void{
    this.snackBar.open(msg,'X',{ //b
      duration:3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: Product): Observable<Product>{ //auto import product e manual Observable do tipo <Product>
    return this.http.post<Product>(this.baseUrl, product);//retorna Observable do tipo 
    /*return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );*/
  }

  read(): Observable<Product[]>{ //read(queryBuilder: QueryBuilder): Observable<Page<Product[]>>{ array de produtos
    return this.http.get<Product[]>(this.baseUrl);
    /*return this.http
    .get<Product[]>(`${this.baseUrl}?${queryBuilder.buildQueryString()}`,{observe: 'response'})
    .pipe(
      map((obj) => <Product[]>.fromResponse(obj)), //map((obj) => <Page<Product[]>>Page.fromResponse(obj)),
      catchError((e) => this.errorHandler(e))
    );*/
  }

  //PAT apenas uma parte ou PUT Objeto todo
  readById(id: number): Observable<Product> { //precisa para inicializar o formulario preenchidos
    //alert('6 - readById: '+id);
    const url = `${this.baseUrl}/${id}`;//simbolo da cráse para intermpolar o valor
    //alert('7 - url: '+url);
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> { //PUT complemento do anterior
    const url = `${this.baseUrl}/${product.id}`;
    //return this.http.put<Product>(url, product)
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    //return this.http.delete<Product>(url)
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;//observable vazio
  }

}
