import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from './authService/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { LayoutModule } from './Admin/layout/layout.module';
import { SidebarComponent } from './Admin/layout/sidebar/sidebar.component';
import { HeaderComponent } from './Admin/layout/header/header.component';
@Component({
  selector: 'app-root',
  imports: [CommonModule ,RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public authService:AuthServiceService) {}

  items: { title: string; link: string }[] = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];
}
