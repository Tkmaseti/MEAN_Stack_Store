// import { Product } from './products';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './components/products/products';




export class Products {
  constructor(
    public title: string,
    public price: string,
    public category: string,
    public description: string,
    public image: String,
  ) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private prodUrl = 'http://localhost:8080/api/products/'

  products: Products[] | undefined;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient,
    private messageService: MessageService,
    // private productService: ProductsService,
    ) { }


  // addProduct(product: Product) : Observable<Product> {
  //   return this.http.post<Product>(this.prodUrl, product, this.httpOptions);}


  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.prodUrl, product, this.httpOptions).pipe(
      tap((newProduct: Product) => window.alert(`added product title with:${newProduct.title}`)),
      catchError(this.handleError<Product>('addHero'))
    );
  }

  getProduct(id: string | null): Observable<Product> {
    const url = `${this.prodUrl}/${id}`;
    return this.http.get<Product>(url).pipe();
  }
  deleteProduct(id: string): Observable<Product> {
    const url = `${this.prodUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  storeProducts(){

    this.http.get<any>('http://localhost:8080/api/products/').subscribe(
      response => {
        console.log(JSON.stringify( response[0]));
        this.products = response;
      }
    )
  }

  searchProduct(term:string): Observable<Product[]>{
    if (!term.trim()) {
      return of ([]);
    }
    return this.http.get<Product[]>(`${this.prodUrl}/?name=${term}`).pipe()
  }

  getProducts(){
    this.http.get<any>('http://localhost:8080/api/products/').subscribe(
      response => {
        this.products = response;
      }
    );
  }
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.prodUrl+`/${product.id}`, product, this.httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.title}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`Product Service: ${message}`);
  }
  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.productService.({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }
}

