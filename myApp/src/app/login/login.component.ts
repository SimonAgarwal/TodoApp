import { Component, OnInit } from '@angular/core';
import {user} from '../users'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user:user={
  username:"",
  password:""
};

  constructor(private _api:ApiService,private router:Router) { }

  ngOnInit(): void {
    
  }
   
 authenticate(){
   
    this._api.login(this.user).subscribe(
      data=>{
      this._api.authenticated=true;
      this._api.active =data;
      this.router.navigate(['/todo']);
    },
    error=>console.log(error)
    )
  }


}
