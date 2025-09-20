import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard, guestGuard } from './auth/auth.guard';
export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'users', component:UserComponent, canActivate: [authGuard]}, // Eager route
    {path:'user:id', component:UserComponent, canActivate: [authGuard]}, // Eager route
    {path:'login', component:LoginComponent,canActivate: [guestGuard]},
    {path:'sign-up',component:SignupComponent,canActivate: [guestGuard]},
    {
        path:'admin',
        loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule)
    },
];
