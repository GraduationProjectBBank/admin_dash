import { Component, OnInit } from '@angular/core';
import { BloodBag } from './bloodBag';
import { BloodBagService } from './service/blood-bag.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blood-bag',
  templateUrl: './blood-bag.component.html',
  styleUrls: ['./blood-bag.component.scss']
})
export class BloodBagComponent implements OnInit {

  constructor(private _BloodBagService:BloodBagService) { }
  open:boolean
  delOpen:boolean = false
  upOpen:boolean = false
  delBag:BloodBag
  bags:BloodBag[]
  bagForm:FormGroup=new FormGroup({
    hospitalId:new FormControl('',[Validators.required]),
    bloodType:new FormControl('',[Validators.required]),
    donorEmail:new FormControl('',[Validators.required]),
  })

  ngOnInit(): void {
    this.getAllBags()
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
        this.open=false
      }
    })

  }
  openUpdate(bag:BloodBag):void{
    this.upOpen=true

    this.delBag = bag

    this.bagForm.setValue({
      hospitalId:bag.hospitalId,
      bloodType:bag.bloodType,
      donorEmail:bag.donorEmail
    })
  }
  closeUpdate():void{
    this.upOpen=false
    this.bagForm.setValue({
      hospitalId:'',
      bloodType:'',
      donorEmail:''
    })
  }
  openDelete(bag:BloodBag):void{
    this.delOpen=true
    this.delBag = bag

  }
  deleteBag():void{
    this._BloodBagService.deleteBag(this.delBag.id).subscribe({
      next:(response)=>{
        this.getAllBags()
        this.delOpen=false
      }
    })
  }


  editBag():void{
    this._BloodBagService.updateBag(this.delBag).subscribe({
      next:(response)=>{
        this.closeUpdate()
        this.getAllBags()

      }
    })
  }
}
