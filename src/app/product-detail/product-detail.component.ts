import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  id: string ='';
  productDetail : any = [];
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
    });
  }

  
  async ngOnInit() {
    
    await fetch(`https://fakestoreapi.com/products/${this.id}`)
      .then(response => response.json())
      .then(json => {
        this.productDetail = json;
        console.log(this.productDetail)
        console.log(this.id)
       
      })
      
  }

  addToCart() {
    // Implement your logic to add the product to the cart here
    alert(`Added ${this.productDetail.title}  to the cart.`);
  }
}
