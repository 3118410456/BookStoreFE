import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoryService } from '../service/category.service';
import Swal from 'sweetalert2';

declare var window: any;


@Component({
  selector: 'app-categorymanager',
  templateUrl: './categorymanager.component.html',
  styleUrls: ['./categorymanager.component.scss'],
})

export class CategorymanagerComponent implements OnInit {
  categoryJson: any = [];
  bookByCategoryID: any = {};
  input: any;
  categoryName: any;
  formCategory: any;
  Category: any = {
    categoryID: 0,
    name: "",
    status: 1
  }
  mode: any;
  searchText:any;

  // test :any = this.getQuantityCategory(1)

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  ngOnInit() {

    this.categoryService.getAllCategory().subscribe(data => {
      this.categoryJson = data
      this.categoryJson.forEach((category: any) => {
        this.http
          .get<any[]>(`https://localhost:44316/api/Books/Category/${category.categoryID}`)
          .subscribe((data: any) => {
            const books = data.filter((x: any) => x.categoryID == category.categoryID && x.status == 1)
            // book.newProperty = "quantityCategoryByID"
            this.bookByCategoryID[category.categoryID] = {
              name: category.name,
              quantity: books.length,
            };
          }
          );
      });
    })

    this.creactFormCategory()

  }

  creactFormCategory() {
    this.formCategory = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );
  }

  openPopupAddCategory() {
    this.mode = true
    if (this.formCategory) {
      this.formCategory.show();
    } else {
      console.error('formCategory is not available.');
    }
  }

  openPopupUpdateCategory(data: any) {


    this.mode = false
    if (this.formCategory) {
      this.Category.categoryID = data.categoryID
      this.Category.name = data.name
      console.log(this.Category);
      this.formCategory.show();
    } else {
      console.error('formCategory is not available.');
    }
  }

  closePopupAddCategory() {
    if (this.formCategory) {
      this.formCategory.hide();
    } else {
      console.error('formCategory is not available.');
    }
  }

  addCategory() {
    // console.log(this.Category);
    this.categoryService.addCategory(this.Category).subscribe(
      (res) => {
        console.log(res);
        Swal.fire('Thêm thành công', '', 'success')
          .then(() => {
            this.closePopupAddCategory();
            window.location.reload();
          });
      },
      (error) => {
        console.error(error);
      })
  }

  async updateCategory() {
    // console.log(this.Category);
    const result = await Swal.fire({
      title: 'Xác nhận SỬA tên loại sách',
      // text: 'Bạn sẽ không thể hoàn tác lại sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
    });

    if (result.isConfirmed) {
      this.categoryService.updateCategory(this.Category).subscribe(res => console.log(res));

      Swal.fire('SỬA thành công', '', 'success').then(() => {
        this.closePopupAddCategory()
        window.location.reload();
      })

    }
  }

  async deleteCategory(data: any) {


    // console.log(this.Category);
    const result = await Swal.fire({
      title: 'Xác nhận XÓA tên loại sách',
      text: 'Bạn sẽ không thể hoàn tác lại sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
    });

    if (result.isConfirmed) {
      this.Category = data;
      this.Category.status = 0;
      this.categoryService.updateCategory(this.Category).subscribe(res => console.log(res));

      Swal.fire('XÓA thành công', '', 'success').then(() => {
        this.closePopupAddCategory()
        // window.location.reload();
      })

    }
  }
}
