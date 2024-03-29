import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{path: '', redirectTo: "/home",pathMatch: 'full'},
                        {path:'home',component:HomeComponent},
                       // {path:'login',component:LoginComponent},
                        {path:'todo',component:TodoComponent},
                       // {path:'register',component:RegisterComponent}
                      ];
                      //canActivate:[AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
