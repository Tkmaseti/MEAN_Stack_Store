import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from 'src/app/products.service';
import { Product } from '../products/products';
import { identifierName } from '@angular/compiler';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  showMe: Boolean = false
  anItem: Boolean = true
  addPro: Boolean = false

  title = ""
  description = ""
  price = 0
  image = ""
  category = ""
  id = ""

  product?: Product
  products: Product[] = []
//
  // products = []

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProduct()
  }

  toogleTag (){
      this.showMe = !this.showMe
  }

  toogleAdd (){
      this.addPro = !this.showMe
  }

  getProduct(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(id)
    .subscribe(res => {
      this.product = res
      // console.log(this.product)
    }
      )
  }


  goBack(): void {
    this.location.back();
  }
  delete(product: Product): void {
    this.product = this.product!;
    this.productsService.deleteProduct(product.id).subscribe();
  }

  productUpdate(){
    if(this.product){
      this.productsService.updateProduct(this.product).subscribe(() => console.log(this.product))
    }

  }
  // onAddProduct(addProduct: newProduct): void {
  //   this.productsService.addProduct(addProduct.value).subscribe();
  // }
  add(): void {
    let data = {
      id: this.id,
      title: this.title,
      description:this.description,
      image:this.image,
      category: this.category,
      price:this.price
    }
    if (!data) { return; }
    this.productsService.addProduct(data)
      .subscribe(product => {
        console.log(product)
        this.products.push(product)
      });
  }
  // add() {
  //   console.log("Hello World")
  // }

  save(): void {
    if (this.product) {
      this.productsService.updateProduct(this.product)
        .subscribe(() => this.goBack());
    }
  }

}
