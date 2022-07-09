import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-body-user',
  templateUrl: './body-user.component.html',
  styleUrls: ['./body-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BodyUserComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }

  onActivate(event) {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 }
}
