import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  name: any ='';
  categories : any;
  constructor(private route: ActivatedRoute) {
   
  }

  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name']; 
      // console.log('1' + this.name)

      fetch(`https://fakestoreapi.com/products/category/${this.name}`)
      .then(response => response.json())
      .then(json => {
        this.categories = json;
        console.log(this.categories)
        // console.log('2' + this.name)
        // alert(this.name)
       
      })

    });
    
    
      
      
  }

  addToCart(data :string) {
    console.log(data);
  }

 
}
