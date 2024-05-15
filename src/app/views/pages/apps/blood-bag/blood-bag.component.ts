import { Component, OnInit } from '@angular/core';
import { BloodBag } from './bloodBag';
import { BloodBagService } from './service/blood-bag.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from'jquery';
import { Hospital } from '../hospital/hospital';
import { HospitalService } from '../hospital/services/hospital.service';
@Component({
  selector: 'app-blood-bag',
  templateUrl: './blood-bag.component.html',
  styleUrls: ['./blood-bag.component.scss']
})
export class BloodBagComponent implements OnInit {

  constructor(private _BloodBagService:BloodBagService,
    private _HospitalService:HospitalService
  ) { }
  open:boolean
  delBag:any=''
  bags:BloodBag[]
  myHospital:Hospital[]=[]
  bagForm:FormGroup=new FormGroup({
    hospitalId:new FormControl('',[Validators.required]),
    bloodType:new FormControl('',[Validators.required]),
    donorEmail:new FormControl('',[Validators.required]),
  })

  ngOnInit(): void {
    this.getAllBags()
    this.allHospital()
  }

  addDialog():void{
    $('.addDialog').slideToggle(400)
  }
  openUpdate(bag:BloodBag):void{
    $('.updateDialog').slideDown(400)

    this.delBag = bag

    this.bagForm.setValue({
      hospitalId:bag.hospitalId,
      bloodType:bag.bloodType,
      donorEmail:bag.donorEmail
    })
  }
  closeUpdate():void{
    $('.updateDialog').slideUp(400)
    this.bagForm.setValue({
      hospitalId:'',
      bloodType:'',
      donorEmail:''
    })
  }
  openDelete(bag:BloodBag):void{
    $('.deleteDialog').slideDown(400)
    this.delBag = bag

  }
  closeDelete():void{
    $('.deleteDialog').slideUp(400)
  }

    getAllBags():void{
      this._BloodBagService.getAllBag().subscribe({
        next:(response)=>{
          this.bags=response
        }
      })

    }
  newBag():void{
    this._BloodBagService.createBag(this.bagForm.value).subscribe({
      next:(response)=>{
        this.getAllBags()
        this.addDialog()      }
    })

  }
  deleteBag():void{
    this._BloodBagService.deleteBag(this.delBag.id).subscribe({
      next:(response)=>{
        this.getAllBags()
        this.closeDelete()
      }
    })
  }
  editBag():void{
    this._BloodBagService.updateBag(this.delBag.id,this.bagForm.value).subscribe({
      next:(response)=>{
        this.closeUpdate()
        this.getAllBags()

      }
    })
  }

  allHospital():void{
    this._HospitalService.allHospital.subscribe({
      next:(response)=>{
        this.myHospital=response
      }
    })
  }
  findHospitalTitle(id:String):any{
    if(this.myHospital.find(hospital=>hospital.id==id) == undefined)
      {
        return id
      }
      else{
      return this.myHospital.find(hospital=>hospital.id==id)?.frontMatter.title

      }
  }
}
