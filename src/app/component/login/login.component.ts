import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/loginService";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';

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
  

  constructor(private fb: FormBuilder,loginService: LoginService, private router: Router,private activateInfo: ActivatedRoute,public dialog: MatDialog,private toastr: ToastrService) {
    this.screenURL = 'test'
    this.userName=''
    this.loginService = loginService
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })

  }
  ngOnInit(): void {
    this.activateInfo.queryParams.subscribe(params =>{  
       this.userName=params.name 
      }) 
    console.log(this.userName); 
      
  }
  onlogout(){
    localStorage.setItem('loginInfo', 'false');
    this.openDialog()
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExample);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  showSuccess() {
    this.toastr.success('Log in Success');
  }

  async onSubmit(): Promise<void> {
    this.showSuccess()
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      try {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        await this.loginService.getAllPerson().subscribe(persons=>{
          for(let i of persons){
            if(i.userName==username){
              console.log(i)
              if(i.info){
                // this.showToaster()
                
                this.router.navigate(['profile/'])
              }
              if(i.hasCovid){
  
                this.router.navigate(['dont/'])
              }
            }
          }
        })
        await this.loginService.loginCheck(new User(username, password,false,false)).subscribe(login => {
          if(login){
            this.loginInvalid = true;
            console.log("success");
    
            this.router.navigate(['admin/'])
          }
          else{
            localStorage.setItem('loginInfo','true');
            localStorage.setItem('user',username);
        
            this.router.navigate(['covid/'],{  
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
      export class DialogContentExample {
      }
