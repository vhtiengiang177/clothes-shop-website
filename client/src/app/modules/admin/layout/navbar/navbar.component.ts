import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserInformation: boolean = false;
  
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  clickUserInformation() {
    this.isUserInformation = !this.isUserInformation
  }

  logout() {
    this.isUserInformation = false
    this.authService.logout();
    if(this.route.snapshot['_routerState'].url != '/')    
      this.router.navigate(['/']);
  }
}
