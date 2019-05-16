import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserService } from './shared/user.service';
import { RouterModule } from '@angular/router';
import { appRouters } from './router';
import { HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NotfoundComponent } from './NotFound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthGuard } from './auth/auth.guard';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrudService } from './shared/repo.service';
import { CategoryService } from './shared/category/category.service';
import { GuidClass } from 'src/app/shared/Guid';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    AdminPanelComponent,
    NotfoundComponent,
    CategoryComponent,
    ProductComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRouters)
  ],
  providers: [UserService,AuthGuard,CrudService,CategoryService,GuidClass],
  bootstrap: [AppComponent]
})
export class AppModule { }
