import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
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
  bookByCategoryID: any = [];
  input: any
  JSlogin: any = []
  loginForm: any = {
    userID: 0,
    username: "",
    password: "",
    name: "",
    role: ""
  }
  messageError:any=false;

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

  constructor(private route: Router, private http: HttpClient , private userService : UserService) {  }

  async ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.JSlogin = data;
      console.log(this.JSlogin)
    })
  }

  async onSubmit() {

    if(this.loginForm.username!='' && this.loginForm.password!='' )
    {
      this.messageError = false
      const account = this.JSlogin.find((x: any) => x.username == this.loginForm.username && x.password == this.loginForm.password)
      if (account) {
        if (account.status == 1) {
          this.loginForm.userID = account.userID;
          this.loginForm.name = account.fullname;
          this.loginForm.role = account.role
          this.loginForm.password = ""
  
          sessionStorage.setItem('login', JSON.stringify(this.loginForm))
          console.log(this.loginForm)
          if (this.loginForm.role == 'admin') {
            await this.route.navigate(["/bookManager"]);
          } else {
            await this.route.navigate(["/home"]);
          }
  
          location.reload();
        }
        else {
          Swal.fire({
            title : 'Tài khoản của bạn đã bị khóa !',
            icon : 'error'
          })
        }
      } else {
        console.log(this.messageError);        
        Swal.fire({
          title : 'Tài khoản hoặc mật khẩu không dúng !',
          icon : 'warning'
        })      }
    }else if(this.loginForm.username=='' || this.loginForm.password=='' || this.loginForm.username==null || this.loginForm.password==null) {
      this.messageError = true;
      console.log(this.messageError);
      
    }
  }

}
