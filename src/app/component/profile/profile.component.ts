import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/User";
import {covidData} from "../../model/covidData" ;
//import {Router} from "@angular/router";
import { LoginService } from '../../service/loginService';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  loginService: LoginService
  user: string
  infoData: string
  id:number

  constructor(loginService: LoginService) {
    this.loginService=loginService
    this.infoData=''
    this.user=''
    this.id=25
  }
   

  ngOnInit(): void {
    this.user = localStorage.getItem('user')||'{}'
    console.log(this.user)
    this.loginService.getAllPerson().subscribe(Person=> {
      for(let i of Person){
        // console.log(i)
        if(i.userName == this.user){
          this.id=i.id
          console.log(i.hasCovid)
          if(i.info!==true){
            this.infoData='please fill the form'
            console.log(this.infoData)
          }
          else{
            if(i.hasCovid){
              this.infoData='covid'
              console.log(this.infoData)
            }
            else{
              this.infoData='health'
            }
          }

        }
      }
    });
    console.log(this.infoData)
  }

}
