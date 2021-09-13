import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/User";
import {covidData} from "../../model/covidData" ;
//import {Router} from "@angular/router";
import { LoginService } from '../../service/loginService';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';


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
  data: covidData[]=[];
  persons: User[]=[];
  covidForm: FormGroup;
  loginService: LoginService;
  hasCovid= false;
  userName: string;
  constructor(private fb: FormBuilder, loginService: LoginService, private router: Router,private activateInfo: ActivatedRoute) {
    //this.person=person;
    this.userName="";
    this.loginService = loginService
    this.covidForm = this.fb.group({
      name: ['',Validators.required],
      fever: ['',Validators.required],
      cough: ['',Validators.required],
    })
  }
  ngOnInit(): void {
    this.activateInfo.queryParams.subscribe(params =>{  
      this.userName=params.name 
     }) 
   console.log(this.userName);
   this.loginService.getCase().subscribe(result=>{this.data=result.features; console.log(this.data[this.data.length-1])});

  }
   onSubmit(): void {
    try{
      const name= this.covidForm.get('name')?.value;
      this.loginService.getAllPerson().subscribe(Person=> {
      for(let i of Person){
        console.log(i)
        if(i.userName == name){
          const fever= this.covidForm.get('fever')?.value;
          const cough= this.covidForm.get('cough')?.value;
          this.persons[0]=i;
          console.log(this.persons[0]);
          this.loginService.deletePerson(i.id).subscribe(result=>{console.log(result);});
          console.log(i.userName);
          console.log(i.passWord);
          this.loginService.registration(new User(i.userName, i.passWord,true)).subscribe(result=>{console.log(result);});
          this.router.navigate(['dont/'])
        }
      }
    });
  }
  catch (e) {
    console.log(e);
  }
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {pperson: this.persons[0]}
      
  //   }); 
  // }

}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }


