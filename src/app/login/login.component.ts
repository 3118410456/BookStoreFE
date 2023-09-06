import { Component, EventEmitter, Injectable, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root',
})

export class LoginComponent {
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent | undefined;
  constructor(private route: Router) {}
  JSlogin: any[] = []
  login:any = {
    username: "",
    password: "",
    name: ""
  }
  confirmOptions: any = {
    labelMode: "floating",
    mode: "password"
  }
  CurrentUsername:string = ''
  userOptions: any = {
    labelMode: "floating"
  }
  passOptions: any = {
    labelMode: "floating",
    mode: "password"
  }
  async onSubmit() {
    const LG = this.JSlogin.find(x => x.username == this.login.username && x.password ==  this.login.password)
    if( LG )
    {
      this.login.name = LG.name.firstname;
      this.CurrentUsername = this.login.username;   
      console.log(this.login.name + "abc")
      // this.truyenDuLieu(this.CurrentUsername);
      // console.log(this.CurrentUsername);
      this.addNewUserName(this.CurrentUsername);
      alert('Đăng nhập thành công.')
      sessionStorage.setItem('login' , JSON.stringify(this.login.name))
      
      await this.route.navigate(["/home"]);
      location.reload();
      
    }else {
      alert('Tài khoản hoặc mặt khẩu không chính xác. ')
    }
    console.log(this.login)  


  }

  async ngOnInit() {
    await fetch('https://fakestoreapi.com/users')
      .then(response => response.json())
      .then(json => {
        this.JSlogin = json;
        console.log(this.JSlogin)
      })
  }


  @Output() newUserEvent = new EventEmitter<string>();

  addNewUserName(value: string) {
    console.log(value);
    this.newUserEvent.emit(value);
    console.log(value);
  }

  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }



}
