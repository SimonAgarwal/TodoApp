import { Injectable, ɵ_sanitizeHtml } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  return this.http.get('todos');
}
deleteItems(_id:string){
  return this.http.delete('todos/'+_id,{responseType: 'text'});
}
updateItems(item:items){
  return this.http.put('todos/'+item._id,item);
}
postItems(item:items){
  return this.http.post('todos',item);
}

login(user:user){
  return this.http.post(this.url+'/login',user,{
    withCredentials:true,headers:new HttpHeaders().append('Content-Type','application/json')});
}
register(user:user){
  return this.http.post(this.url+'/register',user,{responseType: 'text'});
}
logout(){
  return this.http.get(this.url+'/logout',{responseType: 'text'});
}


}
