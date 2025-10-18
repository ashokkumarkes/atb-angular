import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard, guestGuard } from './auth/auth.guard';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LayoutComponent } from './Admin/layout/layout.component';
import { InvoiceComponent } from './Admin/invoice/invoice.component';
import { HsnCodeComponent } from './Admin/hsn-code/hsn-code.component';
import { ProductsComponent } from './Admin/products/products.component';
import { HsnCodeListComponent } from './Admin/hsn-code-list/hsn-code-list.component';
import { CountryCodeComponent } from './Admin/country-code/country-code.component';
import { CategoryComponent } from './Admin/category/category.component';
import { CategoryListComponent } from './Admin/category-list/category-list.component';
import { SubCategoryListComponent } from './Admin/sub-category-list/sub-category-list.component';
import { BrandsListComponent } from './Admin/brands/brands-list.component';
import { WalletComponent } from './Admin/wallet/wallet.component';
import { AddUserComponent } from './user/add-user/add-user.component';
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
            },
            {
                path:'add-user', component:AddUserComponent,
                canActivate:[authGuard]
            },
            {
                path:'hsn-code-list',
                component:HsnCodeListComponent,
                canActivate: [authGuard]
            },
            {
                path:'hsn-code',
                component:HsnCodeComponent,
                canActivate: [authGuard]
            },
            {
                path:'product',component:ProductsComponent,
                canActivate: [authGuard]
            },
            {
                path:'country-code',component:CountryCodeComponent,
                canActivate: [authGuard]
            },
            {
                path:'add-category', component: CategoryComponent,
                canActivate: [authGuard]
            },
            {
                path:'category-list', component: CategoryListComponent,
                canActivate: [authGuard]
            },
            {
                path:'sub-category-list', component: SubCategoryListComponent,
                canActivate: [authGuard]
            }, 
            {
                path:'brands-list', component: BrandsListComponent,
                canActivate: [authGuard]
            },
            {
                path:'create-wallet', component: WalletComponent,
                canActivate: [authGuard]
            }
        ],
    }
];
