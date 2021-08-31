import { Component, OnInit } from '@angular/core';
import {User} from "../model/User";
//import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LoginService } from '../service/loginService';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginForm: FormGroup;
  loginInvalid = false;
  submitted = false;
  formSubmitAttempt = false;
  loginService: LoginService
  constructor(private fb: FormBuilder,loginService: LoginService, private router: Router ) {
    this.loginService = loginService
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
//TODO： 如果注册成功跳转到login页面并在页面显示注册人的名字
  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      try {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        const hasCovid= false;
        await this.loginService.registration(new User(username, password,hasCovid)).subscribe(Regis=> {
          if (Regis === true) {
            this.loginInvalid = true;
            //this.router.navigate(['login/'])// TODO: add redirect form after.
            //this.router.navigate(['login'],{queryParams:{id:username}});
            this.router.navigate(['login/'],{  
              queryParams: {  
              name: username  
              }  
              });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}

