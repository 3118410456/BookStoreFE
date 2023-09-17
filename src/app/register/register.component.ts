import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userJSON :any;
  registerForm: any = {
    userID: 0,
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    role: 'customer',
    status: 1
  };
  checkUsername:any = false;
  submitted = false;

  constructor(private userService : UserService , private route : Router) {
    userService.getAllUsers().subscribe(res => this.userJSON=res)
  }

  onSubmit() {
    this.submitted = true;
    this.checkUsername = false

    // Kiểm tra nếu biểu mẫu không hợp lệ, không thực hiện gì cả
    if (!this.isFormValid()) {
      return;
    }else if(!this.isCheckUsername(this.registerForm.username)) {
      this.userService.addNewUser(this.registerForm).subscribe(res => console.log(res)
      )
      Swal.fire({
        title : 'Đăng kí thành công !',
        icon : 'success'
      }).then(() => this.route.navigate(['/login']))
    }else this.checkUsername = true;

  }

  isFormValid() {
    // Kiểm tra tính hợp lệ của biểu mẫu
    return (
      this.registerForm.fullName !== '' &&
      this.isValidEmail(this.registerForm.email) &&
      this.registerForm.username !== '' &&
      this.registerForm.password !== '' &&
      this.registerForm.password.length >= 6 &&
      this.registerForm.password === this.registerForm.confirmPassword &&
      this.registerForm.birthDate !== ''
    );
  }

  isValidEmail(email: string) {
    // Kiểm tra tính hợp lệ của địa chỉ email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  isCheckUsername(username : any) {
    const check = this.userJSON.some((x:any) => x.username == username)
    return check
  }
}
