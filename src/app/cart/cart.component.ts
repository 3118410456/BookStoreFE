import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  inputValue: string = '';
  // @Input('quantity') quantity : any
  carts: any 
  // totalPrice: any 
  // totalQuantity: any = this.getTotalPrice()
  constructor() { }



  ngOnInit() {

    let storage: any = sessionStorage.getItem('cart');
    if (storage) {
      this.carts = JSON.parse(storage);
      console.log(this.carts)
    } else {
      this.carts = []
    }
    console.log(this.carts)
  }

  updateQuantity(i: any, event: any) {
    let value = event.target.value;

    if (value > 1 && value < 100) {
      this.carts[i].quantity = value        //Gioi han mua trong doan [1,100]
    } else if (value < 1) {
      this.carts[i].quantity = 1;
    } else if (value > 100) {
      this.carts[i].quantity = 100;
    }
    sessionStorage.setItem('cart', JSON.stringify(this.carts))
    console.log('stt : ' + i + ' value : ' + this.carts[i].quantity);
  }

  tangSL(i: any, quantity: any) {
    if (quantity <= 100) {
      this.carts[i].quantity += 1
    } else this.carts[i].quantity = 100;
    sessionStorage.setItem('cart', JSON.stringify(this.carts))
  }

  giamSL(i: any, quantity: any) {
    if (quantity > 1) {
      this.carts[i].quantity -= 1
    } else this.carts[i].quantity = 1;
    sessionStorage.setItem('cart', JSON.stringify(this.carts))
  }


  removeItem(i: any) {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể hoàn tác lại sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có!',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the delete action here
        this.carts.splice(i, 1);
        sessionStorage.setItem('cart', JSON.stringify(this.carts))

        Swal.fire('ĐÃ XÓA!', 'Sản phẩm của bạn đã được xóa.', 'success');
      }
    });
  }

  removeAll() {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa TẤT CẢ sản phẩm khỏi giỏ hàng?',
      text: 'Bạn sẽ không thể hoàn tác lại sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có!',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the delete action here
        sessionStorage.removeItem('cart')
        this.carts = []

        Swal.fire('ĐÃ XÓA!', 'TẤT CẢ Sản phẩm của bạn đã được xóa.', 'success');
      }
    });
  }

  getTotalQuantity(): number {
    let total = 0;

    this.carts.forEach((item: any) => {
      total += item.quantity
    });
    // this.totalQuantity = total;
    return total;
  }

  getTotalPrice(): number {
    
    let total = 0;
    this.carts.forEach((item: any) => {
      total += item.quantity * item.price
    });
    // console.log('cart : ' + this.carts)
    // console.log('abc '+ total)
    return total;
  }


}
