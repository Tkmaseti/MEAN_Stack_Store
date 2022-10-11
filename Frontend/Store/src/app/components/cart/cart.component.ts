import { FooterComponent } from './../footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // items = this.cartService.getItems();
  item = this.cartService.sendItemsToStorage()
  items = this.cartService.getItem()




  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }
  removeItem(item: any){
    this.cartService.removeItem(item)
  }
}
