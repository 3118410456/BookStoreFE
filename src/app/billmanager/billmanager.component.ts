import { Component, OnInit } from '@angular/core';
import { BillService } from '../service/bill.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-billmanager',
  templateUrl: './billmanager.component.html',
  styleUrls: ['./billmanager.component.scss'],
})
export class BillmanagerComponent implements OnInit {
  bills: any[] = [];
  displayedBills: any[] = [];
  currentPage: any = 1;
  itemsPerPage: any = 2;
  originalBills: any = [];
  pageNumber: any;
  billDetails: any = [];
  books: any = [];
  searchText:any;
  filteredLength:any;

  startDate: any;
  endDate: any;

  constructor(private billService: BillService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadBills();
    this.getBooks()
  }


  async loadBills() {
    this.billService.getBills().subscribe((data: any) => {
      console.log(data);

      this.originalBills = data;
      this.bills = this.originalBills
      this.getNumberPage()
    });
  }

  getBooks() {
    this.billService.getAllBooks().subscribe(res =>
      this.books = res
    )
  }

  getBookName(id: any) {
    const book = this.books.find((res: any) => res.bookID == id)
    if (book) {
      console.log(book.title);
      return book.title;
    }
    else return 'Không tìm thấy'

  }

  handleRowClick(bill: any) {
    this.billService.getBillDetailByID(bill.billID).subscribe(data => {
      this.billDetails = data;
      this.billDetails.forEach((res: any) => {           //getNameBookByID 
        res.title = this.getBookName(res.bookID)
      })
    })
  }

  filterByDate() {
    this.bills = this.originalBills

    console.log("start : " + this.startDate);
    console.log("end : " + this.endDate);

    if (this.startDate && this.endDate) {
      this.bills = this.bills.filter((bill) => {
        const billDate: any = this.getDate(new Date(bill.date));
        return billDate >= this.startDate && billDate <= this.endDate;
      });
    } else {
      // Nếu không có ngày bắt đầu hoặc ngày kết thúc, hiển thị toàn bộ danh sách
      console.log("abc");

    }
    this.displayedBills = this.bills;

    this.getNumberPage()

    console.log(this.bills);

  }

  onReset() {
    this.bills = this.originalBills
    this.startDate = null;
    this.endDate = null;
    this.searchText = ""
    this.getNumberPage()
  }

  getDate(myDate: any) {
    const formattedDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
    return formattedDate;
  }

  getNumberPage() {
    this.currentPage = 1;
    this.itemsPerPage = 2;
    this.pageNumber = Math.ceil(this.bills.length / this.itemsPerPage);
    this.updateDisplayedBills();
  }

  updateDisplayedBills() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedBills = this.bills.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPages() {
    const pageCount = Math.ceil(this.bills.length / this.itemsPerPage);
    this.pageNumber = pageCount
    return Array(pageCount)
      .fill(0)
      .map((_, i) => i + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedBills();
    }
  }

  nextPage() {
    if (this.currentPage < this.pageNumber) {
      this.currentPage++;
      this.updateDisplayedBills();
    }
  }

  goToPage() {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.pageNumber) {
      this.currentPage = this.pageNumber;
    }
    this.updateDisplayedBills();
  }

  // updateFilteredLength() {
  //   // Tính độ dài của danh sách hóa đơn sau khi áp dụng bộ lọc
  //   this.filteredLength = this.bills.filter(bill => {
  //     // Kiểm tra xem hóa đơn có phù hợp với tìm kiếm không
  //     return (
  //       bill.fullname.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //       bill.phone.includes(this.searchText) ||
  //       bill.phone.includes(this.searchText) ||
  //       bill.phone.includes(this.searchText) ||
  //       bill.phone.includes(this.searchText) ||
  //       // Thêm các điều kiện tìm kiếm cho các trường khác nếu cần
  //     );
  //   }).length;
  // }


}
