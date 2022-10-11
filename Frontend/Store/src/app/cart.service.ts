import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './components/products/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Product[] = [];
  products: Product | undefined;
  subject = new Subject<any>();
  public search = new BehaviorSubject<string>("");




  constructor(private http: HttpClient) { }

  addToCart(product: Product) {
    this.items?.push(product);
  }

  getItems() {
    return this.items;
  }

  getItem(){
    if(this.items == null){
      var values = JSON.parse(`${localStorage.getItem("cart")}`);
      return values
    }
    else {
      var values = JSON.parse(`${localStorage.getItem("cart")}`);
      return values
    }
  }

  sendItemsToStorage(){
    // var inf = this.items
    // localStorage.setItem('cart',JSON.stringify(inf || []))
    // return inf
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.subject.next('changed');
  }
  removeItem(product:any){
    this.items.map((a:any, index:any) => {
      if (product.id === a.id){
        this.items.splice(index, 1)
      }
    })
  }


  clearCart() {
    this.items = [];
    return this.items;
  }
  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }

  getProducts(){
    this.http.get<any>('http://localhost:8080/api/products/').subscribe(
      response => {
        console.log(response[0]);
        this.products = response;
      }
    );
  }

}
