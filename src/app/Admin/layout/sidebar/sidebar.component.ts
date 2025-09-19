import { Component } from '@angular/core';
import { AuthServiceService } from '../../../authService/auth-service.service';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-sidebar',
  imports: [HeaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public authService:AuthServiceService) {}
}
