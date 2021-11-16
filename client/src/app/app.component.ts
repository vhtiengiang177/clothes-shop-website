import { Component } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'client';
  currentRouter: string
  isAdmin: boolean = false

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouter = event.url;
        if (this.currentRouter.match("\/admin"))
          this.isAdmin = true
        else this.isAdmin = false
      }
    });
  }
}
