import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { HeaderComponent } from './components/header/header.component';
import { BlogDescriptionComponent } from './components/blog-description/blog-description.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostService } from './services/post.service';
import { PageTitleService } from './services/page-title.service';
import { AdminModule } from './admin/admin.module';
import { BaseComponent } from './components/base/base.component';
import { PipesModule } from './pipes/pipes.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { CanActivateAdminService } from './services/can-activate-admin.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
const appRoutes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', component: PostsListComponent },
      { path: 'change-password/:id', component: ChangePasswordComponent },
      { path: 'post/:id', component: PostDetailsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    HeaderComponent,
    BlogDescriptionComponent,
    PostDetailsComponent,
    BaseComponent,
    LoginComponent,
    RegisterComponent,
    UserFormComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminModule,
    PipesModule,
    FormsModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PostService,
    UserService,
    PageTitleService,
    CanActivateAdminService,
    FlashMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
