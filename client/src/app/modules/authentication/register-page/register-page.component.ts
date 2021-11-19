import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountParams } from 'src/app/services/model/account/account-params.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  accountParams: AccountParams 

  constructor(private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute, 
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  register(form) {
    // if(form.valid) {
    //   this.accountParams = {
    //     account: {
    //       id: 0,
    //       email: form.email,
    //       password: form.password
    //     },
    //     customer: {
    //       id:0,
    //       lastName: form.lastName,
    //       firstName: form.firstName
    //     }
    //   }
    //   this.authService.register(this.accountParams).subscribe(res => {
    //     if (res) {
    //       this.router.navigate(['/login']);
    //     }
    //   }, (error: HttpErrorResponse) => {
    //     this.toastr.error("Invalid credentials");
    //   });
    // }
  }
}
