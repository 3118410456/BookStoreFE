import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookmanagerService } from '../service/bookmanager.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText: any;
  bookSearchs: any = [];
  books: any;
  carts: any = this.getSesionStorage()

  itemsPerPage = 6;
  currentPage = 1;


  constructor(private bookService: BookmanagerService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.searchText = params['name'];
      console.log(this.searchText)
    });


  }

  async ngOnInit() {
    const data = await this.bookService.getAllBooks().toPromise()
    this.books = data;

    this.searchByName()
  }

  searchByName() {
    if (this.books && Array.isArray(this.books) && this.searchText != '' && this.searchText != null) {
      this.bookSearchs = this.books.filter((item: any) =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.bookSearchs = [];
    }
    console.log(this.bookSearchs);
  }

  getSesionStorage(): any {
    let cartJSon = sessionStorage.getItem('cart')
    console.log('CARTJSON :' + cartJSon)
    if (cartJSon) {
      return JSON.parse(cartJSon)
    }
    else {
      return [];
    }
  }

  addToCart(product: any): void {
    // alert('Đã thêm ' + product+ ' vào giỏ hàng')
    let checkid = this.carts.find((res: any) => res.id == product.id)

    if (checkid) {
      checkid.quantity += 1;
    }
    else {
      let cart: any = {
        id: product.id,
        title: product.title,
        image: product.image,
        quantity: 1,
        price: product.price,
      }
      // console.log(cart.subtotal())
      this.carts.push(cart)

      console.log('abc' + cart.id)



    }
    sessionStorage.setItem('cart', JSON.stringify(this.carts))
    console.log(this.carts)
    Swal.fire({
      title: 'Thêm ' + product.title + 'vào giỏ hàng thành công !',
      icon: 'success'
    })
  }



  get pages(): number[] {
    const pageCount = Math.ceil(this.bookSearchs.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

}
