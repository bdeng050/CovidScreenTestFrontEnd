import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/loginService';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


export interface PeriodicElement {
  userName: string;
  passWord: number;
  hasCovid: boolean;
  info: boolean;
  id:number
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  persons: User[]=[];
  ifupdate=false;
  updateForm: FormGroup;
  updateForm2: FormGroup;
  dataSource:PeriodicElement[]
  displayedColumns: string[] = ['userName', 'passWord', 'hasCovid', 'info','id'];
  


  constructor(private loginService:LoginService, private fb: FormBuilder) {
    this.dataSource=[]
    this.updateForm = this.fb.group({
      oldId: ['',Validators.required],
      newUsername: ['',Validators.required],
      newPassWord: ['',Validators.required],
    })
    this.updateForm2 = this.fb.group({
      oldId: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.getPPersons();
    console.log(this.persons)
    this.loginService.getAllPerson().subscribe(persons=>{
      let count=0
      for(let i of persons){
        this.dataSource[count]=i
        count++
      }
    });
    console.log(this.dataSource)
  }

  getPPersons(): void{
    this.loginService.getAllPerson().subscribe(persons=>(this.persons=persons));
  }
  onClickMe() {
    this.ifupdate=true;
  }
  onSubmit(): void{
    const old = this.updateForm.get('oldId')?.value;
    const newU = this.updateForm.get('newUsername')?.value;
    const newP = this.updateForm.get('newPassWord')?.value;
    this.loginService.getAllPerson().subscribe(persons=>{
      for(let i of persons){
        if(i.id==old){
          this.loginService.deletePerson(old).subscribe(result=>{console.log(result);});
          this.loginService.registration(new User(newU,newP,i.hasCovid,i.info)).subscribe(result=>{console.log(result)})        
        }
      }
    })  
    // this.loginService.deletePerson(old).subscribe(result=>{console.log(result);});
   // this.loginService.registration(new User(newU,newP,false,false)).subscribe(result=>{console.log(result);}); 
}
onSubmit2(): void{
  const old = this.updateForm2.get('oldId')?.value;
  this.loginService.getAllPerson().subscribe(persons=>{
    for(let i of persons){
      if(i.id==old){
        this.loginService.deletePerson(old).subscribe(result=>{console.log(result);});
        this.loginService.registration(new User(i.userName,i.passWord,!i.hasCovid,i.info)).subscribe(result=>{console.log(result)})        
      }
    }
  })
}
}
