import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isAdmin: boolean = true;
  @Input() Username: any;
  account: any ;
  categories:any ;
  route: any;
  constructor() { }

  async ngOnInit() {
    
    await fetch(`https://fakestoreapi.com/products/categories`)
      .then(response => response.json())
      .then(json => {
        this.categories = json;
        console.log(this.categories)
       
      })
      let storage = sessionStorage.getItem('login');
      if(storage) {
        this.account = JSON.parse(storage);
        console.log(this.account);
        
      }
      
      
  }

  onLogout()  {
    sessionStorage.clear();
    location.reload()
  }
  


  @Input() item = '';



}
