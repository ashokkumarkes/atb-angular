import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { AuthServiceService } from '../../authService/auth-service.service';
@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   constructor(public authService:AuthServiceService) {}
  title = 10;
  isDisplay = true;
}
