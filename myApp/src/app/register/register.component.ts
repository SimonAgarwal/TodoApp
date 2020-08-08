import { Component, OnInit } from '@angular/core';
import {user} from '../users'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user:user={
  username:"",
  password:""
}
  constructor(private _api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }
  register(){
    console.log(this.user);
    this._api.register(this.user).subscribe(()=>{
      console.log( this._api.authenticated);
    this.router.navigate(['/login']);
    })
  }

}
