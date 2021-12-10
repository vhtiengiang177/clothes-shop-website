import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-body-user',
  templateUrl: './body-user.component.html',
  styleUrls: ['./body-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BodyUserComponent implements OnInit {

  constructor() { 
    $(document).ready(function () {
      $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
      }); 
    })
  }

  ngOnInit() {
  }

}
