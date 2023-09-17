import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../service/cart.service';
import { InputService } from '../service/input.service';

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
  constructor(private route : Router, private cartService : CartService, public inputService: InputService) { }



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
    } else if (value <= 1) {
      this.carts[i].quantity = 1;
    } else if (value > 100) {
      this.carts[i].quantity = 100;
    }
    sessionStorage.setItem('cart', JSON.stringify(this.carts))
    // console.log('stt : ' + i + ' value : ' + this.carts[i].quantity);
    let count = this.countTotalQuantity()
    this.cartService.updateTotalQuantity(count)
  }

  tangSL(i: any, quantity: any) {
    if (quantity <= 100) {
      this.carts[i].quantity += 1
    } else this.carts[i].quantity = 100;
    sessionStorage.setItem('cart', JSON.stringify(this.carts))
    let count = this.countTotalQuantity()
    this.cartService.updateTotalQuantity(count)

  }

  giamSL(i: any, quantity: any) {
    if (quantity > 1) {
      this.carts[i].quantity -= 1
    } else this.carts[i].quantity = 1;
    sessionStorage.setItem('cart', JSON.stringify(this.carts))
    let count = this.countTotalQuantity()
    this.cartService.updateTotalQuantity(count)
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
        let count = this.countTotalQuantity()
        this.cartService.updateTotalQuantity(count)
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
        sessionStorage.removeItem('payment');
        sessionStorage.removeItem('totalQuantity');
        this.carts = []
        this.cartService.updateTotalQuantity(0)

        Swal.fire('ĐÃ XÓA!', 'TẤT CẢ Sản phẩm của bạn đã được xóa.', 'success');
      }
    });
  }

  countTotalQuantity(): number {
    let total = 0;

    this.carts.forEach((item: any) => {
      total += item.quantity
    });
    // this.totalQuantity = total;
    sessionStorage.setItem('totalQuantity', JSON.stringify(total))
    return total;
  }

  getTotalPrice(): number {
    
    let total = 0;
    this.carts.forEach((item: any) => {
      total += item.quantity * item.price      
    });
    sessionStorage.setItem('payment', JSON.stringify(total))
    // console.log('cart : ' + this.carts)
    // console.log('abc '+ total)
    return total;
  }

  toNavigatePayment() {
    const login = sessionStorage.getItem('login')
    if(login)
    {
      this.route.navigate(['/payment']);    
    }else alert('Chưa đăng nhập')
  }

  

}
