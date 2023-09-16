import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categoryName:any;
  id: any = '';
  productList : any[] = [];
  products : any = [];
  carts : any = this.getSesionStorage()
  itemsPerPage = 6;
  currentPage = 1;
  constructor(private route: ActivatedRoute, private http: HttpClient) {

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // console.log('1' + this.name)


      this.http.get(`https://localhost:44316/api/Books/Category/${this.id}`).subscribe(res => {
        this.products = res
        console.log(this.products);
        
      })

      this.http.get(`https://localhost:44316/api/Categories/${this.id}`).subscribe(res => {
        const category:any = res
        this.categoryName = category.name
        console.log(category);
        
      })
    });
  }

  getSesionStorage (): any {
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
      }
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
