import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/User";
import {covidData} from "../../model/covidData" ;
//import {Router} from "@angular/router";
import { LoginService } from '../../service/loginService';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';


// import { features } from 'process';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogModule} from '@angular/material/dialog';
// export interface DialogData {
//   pperson:User;
// }
@Component({
  selector: 'app-covid-screen',
  templateUrl: './covid-screen.component.html',
  styleUrls: ['./covid-screen.component.css']
})
export class CovidScreenComponent implements OnInit { 
  cough: string = 'no';
  fever: string = 'no';
  other: string= 'no'
  data: covidData[]=[];
  persons: User[]=[];
  covidForm: FormGroup;
  loginService: LoginService;
  hasCovid= false;
  userName: string;
  token:string
  constructor(private fb: FormBuilder, loginService: LoginService, private router: Router,private activateInfo: ActivatedRoute,private toastr: ToastrService) {
    //this.person=person;
    this.userName="";
    this.loginService = loginService;
    this.token=''
    this.covidForm = this.fb.group({
      name: ['',Validators.required],
      // fever: ['',Validators.required],
      // cough: ['',Validators.required],
    })
  }
  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('loginInfo') || '{}')
    console.log('loginToken',this.token)
    if(!this.token){
      console.log('fail')
      this.router.navigate(['plz/'])
    }
    this.activateInfo.queryParams.subscribe(params =>{  
      this.userName=params.name 
     }) 
     this.loginService.getAllPerson().subscribe(result=>{console.log(result)})
   console.log(this.userName);
   this.loginService.getCase().subscribe(result=>{this.data=result.features; console.log(this.data[this.data.length-1])});

  }
  formVerify(result1:any, result2:any):boolean {
    if(result1=='yes'&& result2=='yes'){
      return true
    }
    return false
  }
   onSubmit(): void {
    this.toastr.success('Submit your status successfully');
    try{
      const name= this.covidForm.get('name')?.value;
      this.loginService.getAllPerson().subscribe(Person=> {
      for(let i of Person){
        // console.log(i)
        if(i.userName == name){
          console.log(this.cough)
          console.log(this.fever)
          if(this.formVerify(this.fever,this.cough)){
          this.loginService.deletePerson(i.id).subscribe(result=>{console.log(result);});
          console.log(i.userName);
          console.log(i.passWord);
          this.loginService.registration(new User(i.userName, i.passWord,true,true)).subscribe(result=>{console.log(result);});
          this.router.navigate(['dont/'])
          }
          else{
            this.loginService.deletePerson(i.id).subscribe(result=>{console.log(result);});
            this.loginService.registration(new User(i.userName, i.passWord,false,true)).subscribe(result=>{console.log(result);});
            this.router.navigate(['profile/'])
          }
          // const fever= this.covidForm.get('fever')?.value;
          // const cough= this.covidForm.get('cough')?.value;
          // if(this.formVerify(fever,cough)){
          // this.loginService.deletePerson(i.id).subscribe(result=>{console.log(result);});
          // console.log(i.userName);
          // console.log(i.passWord);
          // this.loginService.registration(new User(i.userName, i.passWord,true,true)).subscribe(result=>{console.log(result);});
          // this.router.navigate(['dont/'])
          // }
          // else{
          //   this.router.navigate(['profile/'])
          // }
        }
      }
    });
  }
  catch (e) {
    console.log(e);
  }
  }
}




