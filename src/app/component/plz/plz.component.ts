import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plz',
  templateUrl: './plz.component.html',
  styleUrls: ['./plz.component.css']
})
export class PlzComponent implements OnInit {

  constructor(private router: Router,private activateInfo: ActivatedRoute) { }

  ngOnInit(): void {
  }
  onClickMe(){
    this.router.navigate(['dont/'])
  }

}
