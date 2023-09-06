
import { Component , OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit{
  productList : any[] = [];
  products : any[] = [];
  carts : any = this.getSesionStorage()
  itemsPerPage = 6;
  currentPage = 1;
  
  async ngOnInit() {
    await fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => {
        this.products = json;
        console.log(this.products)
        // for(let i=0 ; i < this.products.length ; i++)
        // {
        //   if (this.products[i].id % 2 ==0)
        //   {
        //     this.productList.push(this.products[i])
        //   }
        // }
        // console.log(this.products.some(x=>x.id == 12));
        //  this.productList = this.products.filter(product => product.id % 2 === 0);
        // console.log(this.productList)
      })
      console.log(this.products)
  }

  getSesionStorage () {
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


  addToCart(product: any): void {
    // alert('Đã thêm ' + product+ ' vào giỏ hàng')
    let checkid = this.carts.find((res: any) => res.id == product.id)
    
    if(checkid)    {
      checkid.quantity += 1;
      }
    else {
      let cart:any = {
        id : product.id,
        title: product.title,
        image : product.image,
        quantity: 1,
        price: product.price,
        // subtotal : function () {
        //   return cart.price * cart.quantity;
        // }
      }
      // console.log(cart.subtotal())
      this.carts.push(cart)
      
      console.log('abc' + cart.id)
      
      
     
    }
    sessionStorage.setItem('cart' , JSON.stringify(this.carts))
    console.log(this.carts)
    Swal.fire({
      title : 'Thêm '+ product.title +'vào giỏ hàng thành công !',
      icon : 'success'
    })
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
