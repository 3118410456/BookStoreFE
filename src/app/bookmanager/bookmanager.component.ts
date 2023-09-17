import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BookService } from '../service/book.service';
import Swal from 'sweetalert2';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';

declare var window: any;

@Component({
  selector: 'app-bookmanager',
  templateUrl: './bookmanager.component.html',
  styleUrls: ['./bookmanager.component.scss'],
})
export class BookmanagerComponent implements OnInit {
  // @ViewChild('addBookModal', { static: false }) addBookModal!: ElementRef;
  mode: any;
  formModel: any;
  bookJS: any = [];
  Book: any = {
    bookID: 0,
    title: '',
    image: '',
    categoryID: 0,
    author: '',
    // publisher: "",
    description: '',
    price: 0,
    quantity: 0,
    status: 1,
  };

  categories: any;
  category1: any = {
    name: '',
    status: 1,
  };
  select: any;
  review: any;
  searchText: any;

  constructor(
    private http: HttpClient,
    private bookService: BookService,
    private route: Router,
    private categoryService: CategoryService
  ) { }
  async ngOnInit() {
    this.categoryService.getAllCategory().subscribe((data) => {
        this.categories = data;
        console.log(this.categories);
      });

      this.bookService.getAllBooks().subscribe((data) => {
      this.bookJS = data;
      console.log(this.bookJS);
    });

    this.formModel = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );
  }

  getNameCategory(id: any) {
    const data = this.categories.find((dt: any) => dt.categoryID == id);
    if (data) {
      // console.log(data.name);
      return data.name;
    } else console.log('không tìm thấy category');
  }



  openPopupAddBook() {
    this.mode = true
    this.formModel.show();
  }

  closePopupAddBook() {
    this.formModel.hide();
  }

  openPopupUpdateBook(id: any) {
    this.mode = false
    this.formModel.show();
    this.bookJS.findIndex((x: any) => {
      if (x.bookID == id) {
        console.log(x);
        (this.Book.bookID = x.bookID),
          (this.Book.title = x.title),
          (this.Book.image = x.image),
          (this.Book.categoryID = x.categoryID),
          (this.Book.author = x.author),
          // this.Book.publisher = x.publisher,
          (this.Book.description = x.description),
          (this.Book.price = x.price),
          (this.Book.quantity = x.quantity);

        this.review = x.image;
      }
    });
  }

  selectImage(ev: any) {
    this.select = ev.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.select);
    reader.onload = (data: any) => {
      this.review = data.target.result;
      // console.log(this.review);
      this.Book.image = this.review;
    };
    // console.log(this.select);
  }

  addBook() {
    console.log(this.Book.image);
    console.log('New Product:', this.Book);

    this.bookService.addNewBook(this.Book).subscribe(
      (res) => {
        console.log(res);
        Swal.fire('Thêm sách thành công', '', 'success')
          .then(() => {
            this.closePopupAddBook();
            window.location.reload();
          });
      },
      (error) => {
        console.error(error);
      }
    );



  }


  async updateBook() {
    // console.log(this.Book.image);
    const result = await Swal.fire({
      title: 'Xác nhận SỬA thông tin sách',
      // text: 'Bạn sẽ không thể hoàn tác lại sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có!',
      cancelButtonText: 'Không',
    });

    if (result.isConfirmed) {
      this.bookService.updateBook(this.Book).subscribe(res => console.log(res));

      Swal.fire('SỬA thành công', '', 'success').then(() => {
        this.closePopupAddBook()
        window.location.reload();
      })

    }
  }

  async deleteBook(data: any) {
    // console.log(data);

    console.log(this.Book);

    const result = await Swal.fire({
      title: 'Xác nhận XÓA : ' + this.Book.title,
      text: 'Bạn sẽ không thể hoàn tác lại sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có!',
      cancelButtonText: 'Không',
    });

    if (result.isConfirmed) {
      this.Book = data
      this.Book.status = 0;
      this.bookService.updateBook(this.Book).subscribe(res => console.log(res));

      Swal.fire('XÓA thành công', '', 'success').then(() => {
        this.closePopupAddBook()
        // window.location.reload();
      })

    }
  }



}
