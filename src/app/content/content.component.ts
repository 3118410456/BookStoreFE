
import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CartService } from '../service/cart.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit{
  productList : any[] = [];
  products : any = [];
  carts : any = this.getSessionCart()
  itemsPerPage = 6;
  currentPage = 1;
  constructor(private http: HttpClient,private cartService : CartService) {
    
  }
  
  async ngOnInit() {

    this.http.get(`https://localhost:44316/api/Books`).subscribe(data => {
      this.products = data;
      console.log(this.products)})   
  }

  getSessionCart (): any {
    let cartJSon = sessionStorage.getItem('cart')
    console.log('CARTJSON :' + cartJSon)
    if(cartJSon)
    {
      return  JSON.parse(cartJSon)
    }
    else {
      return [];
    }
  }
  
  getSessionTotalQuantity (): any {
    let cartJSon = sessionStorage.getItem('totalQuantity')
    console.log('CARTJSON :' + cartJSon)
    if(cartJSon)
    {
      return  JSON.parse(cartJSon)
    }
    else {
      return 0;
    }
  }

  addToCart(product: any): void {
    // alert('Đã thêm ' + product+ ' vào giỏ hàng')
    // console.log(this.carts);
    let checkid = this.carts.find((res: any) =>  res.bookID == product.bookID)
    console.log(checkid);
    
    
    if(checkid)    {
      checkid.quantity += 1;
      }
    else {
      let cart:any = {
        bookID : product.bookID,
        title: product.title,
        image : product.image,
        quantity: 1,
        price: product.price,
      }
      this.carts.push(cart)
      
      // console.log('abc' + cart.id) 
    }
    let count = this.countTotalQuantity(this.carts)
    
    
    sessionStorage.setItem('cart' , JSON.stringify(this.carts))
    sessionStorage.setItem('totalQuantity' , JSON.stringify(count))
    
    console.log(this.carts)
    Swal.fire({
      title : 'Thêm '+ product.title +' vào giỏ hàng thành công !',
      icon : 'success'
    })
  const total :any = this.getSessionTotalQuantity()

    this.cartService.updateTotalQuantity(total)
  }

  countTotalQuantity(data:any) {
    let count :any = 0;
    data.forEach((res:any) => {
      count += res.quantity
    })
    return count

  }
    
  get pages(): number[] {
    const pageCount = Math.ceil(this.products.length / this.itemsPerPage);
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
