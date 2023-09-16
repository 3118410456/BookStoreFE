import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  total: any = sessionStorage.getItem('payment');
  account: any = this.getSessionAccount();

  bill: any = {
    billID: 0,
    date: '',
    userID: 0,
    fullname: '',
    phone: '',
    address: '',
    subtotal: 0,
    status: 1,
  };
  billDetails: any = [];

  constructor(private datePipe: DatePipe, private http: HttpClient, private route: Router, private cartService : CartService) {}

  ngOnInit(): void {}

  getPayment() {
    const account: any = this.getSessionAccount();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    if (account) {
      this.bill.date = this.getDate();
      this.bill.userID = account.userID;
      this.bill.subtotal = parseFloat(this.total);
      console.log(this.bill);
      const newBill = JSON.stringify(this.bill)
      console.log(newBill);
      
      this.http.post('https://localhost:44316/api/Bills' , this.bill).subscribe((res:any) => {
        
        this.saveBillDetail(res.billID)
        // console.log(res);
        
      })
    } else {
      alert('chua dang nhap');
    }
  }

  saveBillDetail(i:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const cartItems = this.getSessionCart();
    cartItems.forEach((data: any) => {
      const billItem = {
        id: 0,
        billID: i,
        bookID: data.bookID,
        quantity: data.quantity,
        price: data.price,
      };
      this.billDetails.push(billItem);
    });
  
    const post = { billDetails: this.billDetails };
    const postJSON = JSON.stringify(post);
    console.log(postJSON);
    this.http.post('https://localhost:44316/api/BillDetails/add-multiple',postJSON,httpOptions)
      .subscribe((data: any) => {
          if (
            data &&
            data.hasOwnProperty('message') &&
            data.message === 'Successfully added multiple BillDetails.'
          ) {
            sessionStorage.removeItem('cart');
            sessionStorage.removeItem('payment');
            sessionStorage.removeItem('totalQuantity');
            this.cartService.updateTotalQuantity(0)

  
            Swal.fire('THANH TOÁN THÀNH CÔNG!', 'Đã được lưu vào lịch sử mua hàng.', 'success')
            .then(res => this.route.navigate(['/home']));
            
          } else {
            Swal.fire('THẤT BẠI!', 'Thanh toán thất bại.', 'warning');
          }
        },
        (error) => {
          Swal.fire('LỖI!', 'Đã xảy ra lỗi trong lúc thanh toán.', 'warning');
        }
      );
  }

  

  async confirmPayment() {
    const result = await Swal.fire({
      title: 'Xác nhận thanh toán',
      // text: 'Bạn sẽ không thể hoàn tác lại sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có!',
      cancelButtonText: 'Không',
    });
  
    if (result.isConfirmed) {
      this.getPayment();      
    }
    
  }
  

  getSessionCart() {
    const json: any = sessionStorage.getItem('cart');
    return JSON.parse(json);
  }

  getSessionAccount() {
    const json: any = sessionStorage.getItem('login');
    return JSON.parse(json);
  }

  getDate() {
    const myDate = new Date(); // Thay thế myDate bằng giá trị ngày tháng bạn muốn định dạng
    const formattedDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
    return formattedDate;
  }
}
