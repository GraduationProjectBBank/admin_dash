import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(  private _AdminService:AdminService,
  ) {}
  myUsers:User[]
  open:boolean = false
  userWillAdmin:User
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers():void{
    this._AdminService.allUsers.subscribe({
      next:(response)=>{
        this.myUsers=this.mappingUser(response)
      }
    })

  }
  mappingUser(arr:User[]):User[]{

    //  let userBlood = arr.map((user)=>{
    //   if(!user.bloodType || user.bloodType == "Blood Type"){
    //     return {
    //       ...user ,
    //        bloodType: 'o+'
    //     }
    //   }
    //   else{return user}
    //  })
    //  let userLocation = userBlood.map((user)=>{
    //   if(!user.city || user.city == "Location"){
    //     return {
    //       ...user ,
    //        city: 'alexandria'
    //     }
    //   }
    //   else{return user}
    //  })

    //  let userCountry = userLocation.map((user)=>{
    //   if(!user.country || user.country == "Location"){
    //     return {
    //       ...user ,
    //        country: 'egypt'
    //     }
    //   }
    //   else{return user}
    //  })

    //  let newUesrs = userCountry.map((user)=>{
    //   if(!user.gender || user.gender == "Gender"){
    //     return {
    //       ...user ,
    //        gender: 'male'
    //     }
    //   }
    //   else{return user}
    //  })

    //  return newUesrs
    const defaultUser = {
      bloodType: 'o+',
      city: 'alexandria',
      country: 'egypt',
      gender: 'male'
  };

  return arr.map(user => ({
      ...defaultUser,
      ...user,
      bloodType: user.bloodType && user.bloodType !== "Blood Type" ? user.bloodType : defaultUser.bloodType,
      city: user.city && user.city !== "Location" ? user.city : defaultUser.city,
      country: user.country && user.country !== "Location" ? user.country : defaultUser.country,
      gender: user.gender && user.gender !== "Gender" ? user.gender : defaultUser.gender
  }));
  }

  openDialog(user:User):void{
    this.open=true
    this.userWillAdmin = user
  }
  newAdmin():void{
    this._AdminService.newAdmin(this.userWillAdmin.email).subscribe({
      next:(response)=>{
        this.open=false
        this._AdminService.assignUsers()

      }
    })
  }
}
