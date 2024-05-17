import { Component, OnInit } from '@angular/core';
import { HospitalService } from './services/hospital.service';
import { Hospital } from './hospital';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {


  constructor(private _HospitalService:HospitalService,
  ) { }
  hospitals:Hospital[]
  // timeId:any
  hospitalChange:Hospital= {frontMatter:{title:''}} as Hospital
  createHospital:FormGroup= new FormGroup({
    title: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image2: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
      this.allHospital()
  }
  toggelAdd():void{
    $('.addDialog').slideToggle(400)
  }
  openDelete(hospital:Hospital):void{
    $('.deleteDialog').slideDown(400)
    this.hospitalChange=hospital
  }
    closeDelete():void{
      $('.deleteDialog').slideUp(400)

    }
  openUpdate(hospital:Hospital):void{
    $('.updateDialog').slideDown(400)
    this.hospitalChange=hospital
    this.createHospital.setValue({
    title:hospital.frontMatter.title,
    date:hospital.frontMatter.date,
    description:hospital.frontMatter.description,
    image:hospital.frontMatter.image
    })
  }
    closeUpdate():void{
      $('.updateDialog').slideUp(400)
      this.createHospital.reset('')

    }

  newHospital():void{
    if (this.createHospital.valid) {
    this._HospitalService.createHospital(this.createHospital.value).subscribe({
      next:(response)=>{
        this.toggelAdd()
        this._HospitalService.assignValue()
      }
    })

    }
  }
  allHospital():void{
    this._HospitalService.allHospital.subscribe({
      next:(response)=>{
        this.hospitals=response
      //   this.timeId=setTimeout(() => {
      //     this.myAnimate()
      //   }, 500);
      }
    })
  }
  delHospital():void{

    this._HospitalService.deleteHospital(this.hospitalChange.id).subscribe({
      next:(response)=>{
        this.closeDelete()
        this._HospitalService.assignValue()
      }
    })

  }
  updateHospital():void{
    this._HospitalService.updateHospital(this.hospitalChange.id,this.createHospital.value).subscribe({
      next:(response)=>{
        this.closeUpdate()
        this._HospitalService.assignValue()

      }
    })
  }

  // myAnimate():void{
  //   clearTimeout(this.timeId)
  //   let myCards= document.querySelectorAll('.my-cards')
  //   const option={
  //     threshold:1,
  //     root:null,
  //     // rootmargin:'40px 0px 40px 0px'
  //   }

  //   const interSection:any = new IntersectionObserver(entries=>{
  //     entries.forEach(elment =>{
  //       elment.target.classList.toggle('slide',elment.isIntersecting)

  //     })

  //   },option)
  //   myCards.forEach((card:any) => {
  //     interSection.observe(card)
  //   });
  // }


}
