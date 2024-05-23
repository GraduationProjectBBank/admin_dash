import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _Router:Router,
    private _AuthService:AuthService
  ){}
  ngOnInit(): void {
  }

  // onRegister(e: Event) {
  //   e.preventDefault();
  //   localStorage.setItem('isLoggedin', 'true');
  //   if (localStorage.getItem('isLoggedin')) {
  //     this._Router.navigate(['/']);
  //   }
  // }

  formValue:any

  registerForm:FormGroup= new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]) ,
    gender:new FormControl('',[Validators.required]) ,
    bloodType:new FormControl('',[Validators.required]) ,
    password:new FormControl('',[Validators.pattern('.{8,}'),Validators.required]) ,
    username:new FormControl('',[Validators.pattern('([a-zA-Z]){3,}'),Validators.required]) ,
    firstName:new FormControl('',[Validators.pattern('([a-zA-Z]){2,}'),Validators.required]) ,
    lastName:new FormControl('',[Validators.pattern('([a-zA-Z]){2,}'),Validators.required]) ,
    phone:new FormControl('',[Validators.pattern('01(0|2|5|1)[0-9]{8}'),Validators.required]) ,
  })

  handelForm():void{
    if( this.registerForm.valid ){
      this.formValue=this.registerForm.value
      this._AuthService.register(this.registerForm.value).subscribe({
        next:(response)=>{
          localStorage.setItem('token',response.registerResponse.idToken)
          this.sendMoreData()
          this._Router.navigate(['/auth/varify'])
        }
      })

    }
  }
  sendMoreData():void{
    this._AuthService.updateUser(this.registerForm.value).subscribe({
      next:(response)=>{
        console.log(response);
      }
    })
  }

}
