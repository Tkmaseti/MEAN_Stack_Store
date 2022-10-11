import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/products.service';
import { Product } from '../products/products';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // productService.getAll().subscribe((a: Product[]) => this.products = a);

  products$!: Observable<Product[]>;

  private searchTerms = new Subject<string>();

  constructor(private productService: ProductsService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),

      switchMap((term: string) => this.productService.searchProduct(term))
    );
  }
}
