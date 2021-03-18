import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home.component';
import { AuthGuard } from './helper/auth.guard';
import { RegisterPageComponent } from './pages/register/register.component';
import { BlogPageComponent } from './pages/blog/blog.component';

const routes: Routes = [
    { path: '', component: HomePageComponent}, 
    { path: 'blog', component: BlogPageComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterPageComponent}
];

export const AppRoutingModule = RouterModule.forRoot(routes)