// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component'; // Root component

@NgModule({
  declarations: [
    AppComponent // Declare your components here
  ],
  imports: [
    BrowserModule,         // Required for browser apps
    FormsModule,           // For Template-driven forms
    ReactiveFormsModule,   // For Reactive forms
    // HttpClientModule,      // For HTTP requests
    RouterModule.forRoot([{ path: 'products', loadChildren: () => import('./Admin/products/products.module').then(m => m.ProductsModule) }]) // Add routes here
  ],
  providers: [],           // Services go here
  bootstrap: [AppComponent] // Root component to load at start
})
export class AppModule { }
