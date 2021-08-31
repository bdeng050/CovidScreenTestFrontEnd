import { Component, OnInit } from '@angular/core';

import {User} from "../../model/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/loginService";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  loginInvalid = false;

  submitted = false;

  formSubmitAttempt = false;

  loginService: LoginService

  screenURL: string;
  userName: string;
  

  constructor(private fb: FormBuilder,loginService: LoginService, private router: Router,private activateInfo: ActivatedRoute) {
    this.screenURL = 'test'
    this.userName=''
    this.loginService = loginService
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
    //console.log(this.routeInfo.queryParams);
  }
  ngOnInit(): void {
    this.activateInfo.queryParams.subscribe(params =>{  
       this.userName=params.name 
      }) 
    console.log(this.userName); 
      
  }
//TODO: 跳转问题 登陆成功跳转至新页面 如果username是Loki就跳转到admin
  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      try {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        //console.log(password);
        await this.loginService.getAllPerson().subscribe(persons=>{
          for(let i of persons){
            if(i.userName==username){
              if(i.hasCovid){
                this.router.navigate(['dont/'])
              }
            }
          }
        })
        await this.loginService.loginCheck(new User(username, password,false)).subscribe(login => {
          // if (login.equals("customer")) {
          //   this.loginInvalid = true;
          //   console.log("success");
          // }
          if(login){
            this.loginInvalid = true;
            console.log("success");
            this.router.navigate(['admin/'])
          }
          else{
            //this.router.navigate(['covid/'])
            this.router.navigate(['covid/'],{  
              queryParams: {  
              name: username  
              }  
              });
          }
          //console.log(login);
          // if(login.equals("admin")){
          //   this.loginInvalid = true;
          //   this.router.navigate(['admin/'])  
          // }
          // else{
          //   this.router.navigate(['register/'])
          // }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

      // async onSubmit2(): Promise<void>{
      //   const username = this.loginForm.get('username')?.value;
      //   const password = this.loginForm.get('password')?.value;
      //   let promise=this.loginService.logincheck2(new User(username, password)).then(login=>{
      //     {if (login.equals("customer")) {
      //       this.loginInvalid = true;
      //       this.router.navigateByUrl("autocomplete"); // TODO: add redirect form after.
      //       return promise;
      //     }
      //     }

      //   });
      // }catch(e){
      //     console.log(e);
      //   }

      
      
      
      
      }



