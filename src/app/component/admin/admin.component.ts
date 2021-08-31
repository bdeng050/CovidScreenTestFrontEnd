import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/loginService';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  persons: User[]=[];
  ifupdate=false;
  updateForm: FormGroup;
  


  constructor(private loginService:LoginService, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      oldId: ['',Validators.required],
      newUsername: ['',Validators.required],
      newPassWord: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getPPersons();
  }

  getPPersons(): void{
    this.loginService.getAllPerson().subscribe(persons=>(this.persons=persons));
  }
  onClickMe() {
    this.ifupdate=true;
  }
  onSubmit(): void{
    try{
    const old = this.updateForm.get('oldId')?.value;
    const newU = this.updateForm.get('newUsername')?.value;
    const newP = this.updateForm.get('newPassWord')?.value;
    this.loginService.deletePerson(old).subscribe(result=>{console.log(result);});
    this.loginService.registration(new User(newU,newP,false)).subscribe(result=>{console.log(result);});
    
    }
    catch (e) {
      console.log(e);
    }

  }



}
