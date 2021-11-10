import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BodyComponent implements OnInit {

  bodyItem: string = ""

  constructor(private route: ActivatedRoute) {
    console.log(this.route.snapshot.pathFromRoot[0]);
    
  }

  ngOnInit() {
  }

}
