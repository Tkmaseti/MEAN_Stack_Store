import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items = this.cartService.getItems();


  constructor(
    private cartService: CartService
  ) { }
  ngOnInit(): void {
  }

}
