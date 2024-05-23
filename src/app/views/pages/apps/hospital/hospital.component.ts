import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from './services/hospital.service';
import { Hospital } from './hospital';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {

  constructor(private _HospitalService:HospitalService,
  ) { }
  myHospital:Hospital[]
  file:any
  hospitalChange:Hospital= {frontMatter:{title:''}} as Hospital
  createHospital:FormGroup= new FormGroup({
    title: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image2: new FormControl('',[Validators.required])
  })
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplayHoverPause:true,
    margin:15,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
      this.allHospital()

  }

  newHospital():void{
    const formData = new FormData();
    formData.append('image', this.file);
    if (this.createHospital.valid) {
    this._HospitalService.createHospital(this.createHospital.value).subscribe({
      next:(response)=>{
        this.addImage(response.id,formData)
        this.toggelAdd()
      }
    })

    }
  }

  addImage(id:string,model:any):void{
    this._HospitalService.putImage(model,id).subscribe({
      next:(response)=>{
        this._HospitalService.assignValue()
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

    getFile(event:any){
      this.file=event.target.files[0]
    }
    getMonthName(dateString:any) {
      // Split the date string into year, month, and day
      const [year, month, day] = dateString.split('-');
      // Create a Date object
      const date = new Date(year, month - 1, day); // Month is zero-based

      // Get the month name
      const monthName = date.toLocaleString('default', { month: 'long' });

      return monthName + ','+ day;
    }
}
