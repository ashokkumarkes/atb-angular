import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
   exports: [
  ]
})
export class LayoutModule { }
