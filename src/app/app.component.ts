import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    if (environment.analyticsEnabled) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          gtag('config', 'G-MD06T4XGJJ', { page_path: event.url });
        }
      });
    }
  }
}
