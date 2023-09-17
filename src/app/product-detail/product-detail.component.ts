import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../service/cart.service';
import { InputService } from '../service/input.service';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  id: string = '';
  quantity: number = 1
  productDetail: any = [];
  carts: any = this.cartService.getSessionCart()


  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    public inputService: InputService,
    public bookService: BookService
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
    });
  }


  async ngOnInit() {
    this.bookService.getBookByID(this.id).subscribe((data:any) => {
      this.productDetail = data;
      console.log(this.productDetail)
    })



  }

  tangSL(i: any) {
    if (i < 100) {
      this.quantity += 1
    } else this.quantity = 100;
    //   sessionStorage.setItem('cart', JSON.stringify(this.carts))
  }

  giamSL(i: any) {
    if (i > 1) {
      this.quantity -= 1
    } else this.quantity = 1;
    // sessionStorage.setItem('cart', JSON.stringify(this.carts))
  }

  addToCart(product: any): void {
    // alert('Đã thêm ' + product+ ' vào giỏ hàng')
    // console.log(this.carts);
    let checkid = this.carts.find((res: any) => res.bookID == product.bookID)
    console.log(checkid);
    if (checkid) {
      checkid.quantity += this.quantity;
    }
    else {
      let cart: any = {
        bookID: product.bookID,
        title: product.title,
        image: product.image,
        quantity: this.quantity,
        price: product.price,
      }
      this.carts.push(cart)
    }
    let count = this.countTotalQuantity(this.carts)
    sessionStorage.setItem('cart', JSON.stringify(this.carts))
    sessionStorage.setItem('totalQuantity', JSON.stringify(count))

    console.log(this.carts)
    Swal.fire({
      title: 'Thêm ' + product.title + ' vào giỏ hàng thành công !',
      icon: 'success'
    })
    const total: any = this.cartService.getSessionTotalQuantity()

    this.cartService.updateTotalQuantity(total)
  }

  countTotalQuantity(data: any) {
    let count: any = 0;
    data.forEach((res: any) => {
      count += res.quantity
    })
    return count

  }

  // getSessionTotalQuantity(): any {
  //   let cartJSon = sessionStorage.getItem('totalQuantity')
  //   console.log('CARTJSON :' + cartJSon)
  //   if (cartJSon) {
  //     return JSON.parse(cartJSon)
  //   }
  //   else {
  //     return 0;
  //   }
  // }

  // getSessionCart(): any {
  //   let cartJSon = sessionStorage.getItem('cart')
  //   console.log('CARTJSON :' + cartJSon)
  //   if (cartJSon) {
  //     return JSON.parse(cartJSon)
  //   }
  //   else {
  //     return [];
  //   }
  // }


}
