import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _api:ApiService,private router:Router){}
  canActivate():boolean{
  if(this._api.authenticated){
    return true;
  }
  else{
    this.router.navigate(['/login'])
    return false;
  }
   
  }
  
}
