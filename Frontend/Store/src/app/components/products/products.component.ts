import { ProductsService } from './../../products.service';
import { CartService } from './../../cart.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { json } from 'body-parser';
import { ActivatedRoute } from '@angular/router';
import { Product } from './products';

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


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  item = this.cartService.sendItemsToStorage();
  // values = this.cartService.getItem();

  products: Product[] | undefined;

  // product: Product | undefined;

  constructor(
    private hhtpClient: HttpClient,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductsService,
    ) { }


  ngOnInit(): void {
    this.getProducts()
  }

  sendToCartStorage(){
    let prods = this.cartService.getItem()
    // window.alert('item added')

  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    // window.alert('Your product has been added to the cart!');
    this.sendToCartStorage()
  }

  getProducts(){
    this.hhtpClient.get<any>('http://localhost:8080/api/products/').subscribe(
      response => {
        // console.log(response);
        this.products = response;
      }
    );
  }
}
