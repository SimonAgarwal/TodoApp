import { Injectable, ɵ_sanitizeHtml } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {items} from './todoList';
import {user} from './users'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  active;
allItems:items[];
item:items;
user:user;
authenticated:boolean=false;
url='http://localhost:3000/todos';

  constructor(private http:HttpClient,private router:Router) { }
getItems(){
  return this.http.get(this.url);
}
deleteItems(_id:string){
  return this.http.delete(this.url+'/'+_id,{responseType: 'text'});
}
updateItems(item:items){
  return this.http.put(this.url+'/'+item._id,item);
}
postItems(item:items){
  return this.http.post(this.url,item);
}

login(user:user){
  return this.http.post(this.url+'/login',user,{responseType: 'json'});
}
register(user:user){
  return this.http.post(this.url+'/register',user,{responseType: 'text'});
}
logout(){
  return this.http.get(this.url+'/logout',{responseType: 'text'});
}


}
