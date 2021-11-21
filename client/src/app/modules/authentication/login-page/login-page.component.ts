import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  invalidLogin: boolean;
  
  constructor(private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute, 
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  login(form) {
    if(form.valid) {
      this.authService.login(form.value).subscribe(res => {
        if (res) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
        else this.invalidLogin = true;
      }, (error: HttpErrorResponse) => {
        this.toastr.error("Invalid credentials");
      });
    }
  }

}
