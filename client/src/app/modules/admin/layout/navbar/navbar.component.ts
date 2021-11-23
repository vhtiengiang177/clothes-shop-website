import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserInformation: boolean = false;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  clickUserInformation() {
    this.isUserInformation = !this.isUserInformation
  }
}
