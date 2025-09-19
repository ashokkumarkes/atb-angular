import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { DashboardComponent } from './Admin/dashboard/dashboard.component'; 

import { authGuard, guestGuard } from './auth/auth.guard'; 
import { SettingComponent } from './Admin/setting/setting.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { InvoiceComponent } from './Admin/invoice/invoice.component';
export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'users', component:UserComponent, canActivate: [authGuard]}, // Eager route
    {path:'user:id', component:UserComponent, canActivate: [authGuard]}, // Eager route
    {path:'login', component:LoginComponent,canActivate: [guestGuard]},
    {path:'sign-up',component:SignupComponent,canActivate: [guestGuard]},
    {
        path:'admin',
        // loadComponent: () => import('./Admin/products/products.component').then(m => m.ProductsComponent), // Lazy loading
        children:[
            { path:'dashboard',component:DashboardComponent,canActivate: [authGuard]},
            { path:'invoice', component:InvoiceComponent, canActivate: [authGuard] }, // Lazy load a single component
            { path:'settings', component: SettingComponent, canActivate: [authGuard] }
        ]
    },
    {
        path:'products',loadChildren: () => import('./Admin/products/products.module').then(m => m.ProductsModule), //Lazy load a feature module / route tree
    },
    { 
        path:'chat-box', component: ChatBoxComponent, canActivate: [authGuard] 
    },
];
