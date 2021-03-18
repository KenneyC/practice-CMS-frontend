import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home.component';
import { LoginForm } from './components/organism/login-form/login-form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { BlogFormComponent } from './components/organism/blog-form/blog-form.component';
import { RegisterFormComponent } from './components/organism/register-form/register-form.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { ErrorInterceptor } from './helper/error.interceptor';
import { BlogPageComponent } from './pages/blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginForm,
    BlogFormComponent,
    RegisterFormComponent,
    RegisterPageComponent,
    BlogPageComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
