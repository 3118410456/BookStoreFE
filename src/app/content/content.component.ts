
import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit{
  productList : any[] = [];
  products : any[] = [];
  itemsPerPage = 6;
  currentPage = 1;
  
  async ngOnInit() {
    await fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => {
        this.productList = json;
        console.log(this.productList)
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
      console.log(this.productList)
  //     var request = new XMLHttpRequest();
  //     request.open('GET', 'https://api.escuelajs.co/api/v1/products');
  //     //request.setRequestHeader('Accept', 'application/json');
  //     request.onload = () => { // Use an arrow function here
  //       console.log(JSON.parse(request.response));
  //       this.productList = JSON.parse(request.response); // 'this' refers to ContentComponent instance
  //     };

  //     request.send();
  }

  addToCart(product: any) : void {
    alert('Đã thêm ' + product+ ' vào giỏ hàng')
  }

  get pages(): number[] {
    const pageCount = Math.ceil(this.productList.length / this.itemsPerPage);
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
