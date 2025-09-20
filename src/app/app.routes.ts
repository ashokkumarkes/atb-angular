import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard, guestGuard } from './auth/auth.guard';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LayoutComponent } from './Admin/layout/layout.component';
import { InvoiceComponent } from './Admin/invoice/invoice.component';
import { HsnCodeComponent } from './Admin/hsn-code/hsn-code.component';
export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    
    {path:'user:id', component:UserComponent, canActivate: [authGuard]}, // Eager route
    {path:'login', component:LoginComponent,canActivate: [guestGuard]},
    {path:'sign-up',component:SignupComponent,canActivate: [guestGuard]},
    {
        path:'admin',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate: [authGuard]
            },
            {
                path:'invoice',
                component:InvoiceComponent,
                canActivate: [authGuard]
            },
            {   
                path:'users', component:UserComponent, 
                canActivate: [authGuard]
            }, // Eager route
            {
                path:'hsn-code',
                component:HsnCodeComponent,
                canActivate: [authGuard]
            }
        ],

    }
];
