import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ActivatedRoute, Route, Router } from '@angular/router';
// import { DxFormComponent } from 'devextreme-angular';
// import * as jQuery from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root',
})

export class LoginComponent {
  // @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent | undefined;
  constructor(private route: Router, private http: HttpClient) { }
  bookByCategoryID: any = [];
  input:any
  JSlogin: any = []
  login: any = {
    userID:0,
    username: "",
    password: "",
    name: "",
    role: ""
  }
  confirmOptions: any = {
    labelMode: "floating",
    mode: "password"
  }
  CurrentUsername: string = ''
  userOptions: any = {
    labelMode: "floating"
  }
  passOptions: any = {
    labelMode: "floating",
    mode: "password"
  }
  async onSubmit() {
    const account = this.JSlogin.find((x: any) => x.username == this.login.username && x.password == this.login.password)
    if (account) {
      if (account.status == 1) {
        this.login.userID = account.userID;
        this.login.name = account.fullname;
        this.login.role = account.role
        this.login.password = "" 

        alert('Đăng nhập thành công.')
        sessionStorage.setItem('login', JSON.stringify(this.login))
        console.log(this.login)
        if(this.login.role == 'admin')
        {
          await this.route.navigate(["/bookManager"]);
        }else {
          await this.route.navigate(["/home"]);
        }
        
        location.reload();
      }
      else alert('Tài khoản của bạn đã bị khóa.')
    } else {
      alert('Tài khoản hoặc mặt khẩu không chính xác. ')
    }


  }

  async ngOnInit() {
    this.http.get(`https://localhost:44316/api/Users`).subscribe(data => {
      this.JSlogin = data;
      console.log(this.JSlogin)
    })
  }


  // @Output() newUserEvent = new EventEmitter<string>();

  // addNewUserName(value: string) {
  //   console.log(value);
  //   this.newUserEvent.emit(value);
  //   console.log(value);
  // }

  // @Output() newItemEvent = new EventEmitter<string>();

  // addNewItem(value: string) {
  //   this.newItemEvent.emit(value);
  // }

  async getQuantityCategory() {
    await this.http
      .get(`https://localhost:44316/api/Books/Category/${this.input}`)
      .subscribe((data) => {
        this.bookByCategoryID = data;
        // console.log(this.bookByCategoryID);
        console.log(this.bookByCategoryID.length);
        
      });
    
  }

}
