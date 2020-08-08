import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(public _api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this._api.logout().subscribe((res)=>{
      this._api.authenticated=false;
      console.log(this._api.authenticated);
      this._api.active={};
      console.log(res);
      this.router.navigate(['/login']);
    })
  }

}
