import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  encapsulation: ViewEncapsulation.None
})

@NgModule({
  declarations: [
    AngularFontAwesomeModule
  ]
})
export class BodyComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit() {
  }

}
