import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  id: string ='';
  quantity :number = 1
  productDetail : any = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
    });
  }

  
  async ngOnInit() {
    this.http.get(`https://localhost:44316/api/Books/${this.id}`).subscribe(data => {
      this.productDetail = data;
      console.log(this.productDetail)})
    
      
      
  }

  tangSL(i: any) {
    if (i < 100) {
      this.quantity += 1
    } else this.quantity = 100;
  //   sessionStorage.setItem('cart', JSON.stringify(this.carts))
  }

  giamSL(i : any) {
    if (i > 1) {
      this.quantity -= 1
    } else this.quantity = 1;
    // sessionStorage.setItem('cart', JSON.stringify(this.carts))
  }

  updateQuantity(event: any) {
    let value = event.target.value;

    if (value > 1 && value < 100) {
      this.quantity = value        //Gioi han mua trong doan [1,100]
    } else if (value < 1) {
      this.quantity = 1;
    } else if (value >= 100) {
      this.quantity = 100;
    }
    // sessionStorage.setItem('cart', JSON.stringify(this.carts))
    console.log(' value : ' + this.quantity);
  }

  addToCart() {
    // Implement your logic to add the product to the cart here
    alert(`Added ${this.productDetail.title}  to the cart.`);
  }

  
}
