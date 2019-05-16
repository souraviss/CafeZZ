import { Router, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './NotFound/notfound.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
export const appRouters:Routes=[
{path:'home',component:HomeComponent,canActivate:[AuthGuard]},
{path:'forbidden',component:NotfoundComponent,canActivate:[AuthGuard]},
{path:'adminPanel',component:HomeComponent,
children:[{
    path:'',component:AdminPanelComponent,canActivate:[AuthGuard]
}]},

// {path:'adminPanel',component:AdminPanelComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
{path:'category',component:HomeComponent,
children:[{
path:'',component:CategoryComponent
}]},
{path:'product',component:HomeComponent,
children:[{
path:'',component:ProductComponent
}]},
{path:'dashboard',component:HomeComponent,
children:[{
path:'',component:DashboardComponent
}]},
{
path:'Signup',component:UserComponent,
children:[{
    path:'',component:SignUpComponent
}]
},
{
    path:'Login',component:UserComponent,
    children:[{
        path:'',component:SignInComponent
    }]  
},
{path:'',redirectTo:'/Login',pathMatch:'full'}
];