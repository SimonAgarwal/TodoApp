import { Component, OnInit } from '@angular/core';
import {items} from '../todoList';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  allItems:items[];
  item:items={
    _id:"",
    text:""
  };
  text:string;
  active={
    id:""
  }

  constructor(private _api:ApiService){}
  ngOnInit(): void {
    this.TodoItems();
    console.log(this._api.active.username);
    console.log(this.active);
  }

TodoItems(){
  this._api.getItems().subscribe((res)=>{
    this._api.allItems=res as items[];
    this.allItems=this._api.allItems;
    console.log(this.allItems);
    this.active.id=this._api.active._id;
    
  })
}
toDelete(item){
  if(confirm("Are You Sure?")){
    this._api.deleteItems(item._id).subscribe((res)=>{
      console.log("deleted");
      this.TodoItems();
    })
  }
 
 
}
toUpdateItem(item){
this.item=item;
console.log(this.item);
}
toUpdate(){
this.item.text=this.text;
  this._api.updateItems(this.item).subscribe((res)=>{
    this.TodoItems();
    console.log("updated");
    this.refresh();
   
  });
 
}
AddItem(){
  this.item.text=this.text;
  console.log(this.item);
  this._api.postItems(this.item).subscribe((res)=>{
    this.TodoItems();
   
  });
  this.refresh();
}

refresh(){
  this.item._id="";
  this.item.text="";
  this.text="";
}
}
