import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as jQuery from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private route: Router) {}
  login: any[] = []
  ahihi: any = {
    user: "",
    pass: ""
  }
  userOptions: any = {
    labelMode: "floating"
  }
  passOptions: any = {
    mode: "password"
  }
  onSubmit() {
    if(this.login.some(x => x.username == this.ahihi.user && x.password ==  this.ahihi.pass)  )
    {
      alert('dang nhap thanh cong')
      this.route.navigate(["/home"]);
    }else {
      alert('onnichan')
    }
    console.log(this.ahihi)  
  }

  async ngOnInit() {
    await fetch('https://fakestoreapi.com/users')
      .then(response => response.json())
      .then(json => {
        this.login = json;
        console.log(this.login)
      })
  }
  
}
