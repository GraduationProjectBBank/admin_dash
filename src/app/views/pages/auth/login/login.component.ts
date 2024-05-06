import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // returnUrl: any;

  // constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.returnUrl);

  }

  // onLoggedin(e: Event) {
  //   e.preventDefault();
  //   localStorage.setItem('isLoggedin', 'true');
  //   if (localStorage.getItem('isLoggedin')) {
  //     this.router.navigate([this.returnUrl]);
  //   }
  // }

  constructor(
    private _AuthService:AuthService,
    private _Router:Router

  ){}
  loginForm:FormGroup= new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]) ,
    password:new FormControl('',[Validators.pattern('.{8,}'),Validators.required])
  })
  handelForm():void{

    if( this.loginForm.valid ){
      this._AuthService.login(this.loginForm.value).subscribe({
        next:(response)=>{
          localStorage.setItem('token',response.registerResponse.idToken)
          localStorage.setItem('refToken',response.registerResponse.refreshToken)
          localStorage.setItem('userEmail',response.user.email)
          localStorage.setItem('userName',response.user.username)
          this._Router.navigate(['/dashboard'])
        }
      })

    }
  }

}
