import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookmanagerService } from '../service/bookmanager.service';
import { CartService } from '../service/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  account: any;
  categories: any;
  books: any;
  searchText: any;
  bookSearchs: any = [];
  totalQuantity: any = 0;

  constructor(private http: HttpClient, private bookService: BookmanagerService, private route: Router, private cartService : CartService) { }

  async ngOnInit() {

    this.http.get('https://localhost:44316/api/Categories').subscribe(data => {
      this.categories = data
      console.log(this.categories);
      this.getSessionTotalQuantity()
    })

    let storage = sessionStorage.getItem('login');
    if (storage) {
      let accountJS = JSON.parse(storage);
      this.account = accountJS.name
      if (accountJS.role == 'admin') {
        this.isAdmin = true
      } else this.isAdmin = false;
    }
    console.log(this.account);

    this.getBooks()
    
    this.cartService.totalQuantity$.subscribe((quantity) => {
      this.totalQuantity = quantity;
      console.log(this.totalQuantity);
      
    });
  }
  

  getBooks() {
    this.bookService.getAllBooks().subscribe(data => this.books = data)
  }

  searchByName() {
    if (this.books && Array.isArray(this.books) && this.searchText != '' && this.searchText != null) {
      this.bookSearchs = this.books.filter((item: any) =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.bookSearchs = [];
    }
  }

  getSessionTotalQuantity() {
    let storage = sessionStorage.getItem('totalQuantity');
    if (storage) {
      this.cartService.updateTotalQuantity(storage)
      return JSON.parse(storage);
    }
  }


  onLogout() {
    sessionStorage.clear();
    this.route.navigate(['/home']).then(() =>
      location.reload())

  }

  navigateToSearchPage() {
    if (this.searchText) {
      this.route.navigate(['/search', this.searchText]);
    }
  }


}
