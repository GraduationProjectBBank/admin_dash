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
  hospitalChange:Hospital= {frontMatter:{title:''}} as Hospital
  createHospital:FormGroup= new FormGroup({
    title: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required])
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
    console.log(this.createHospital.valid);

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



//   openUpdate(ticket:Ticket){
//     this.createTicket.setValue({ownerEmail:ticket.ownerEmail ,
//        hospitalID:ticket.hospitalID ,
//        donationDate:ticket.donationDate,
//        expiryDate:ticket.expiryDate,
//        transferDate:ticket.transferDate,
//       })
//       $('.updateDialog').slideDown(400)
//   }
//   closeUpdate():void{
//     this.createTicket.reset('')
//     $('.updateDialog').slideUp(400)
//   }




//   openDelete(ticket:Ticket){
//       this.ticketWillDelete=ticket
//       $('.deleteDialog').slideDown(400)
//   }
//   closeDelete():void{
//     $('.deleteDialog').slideUp(400)
//   }





//   updateTicket():void{

//     if(this.createTicket.valid){
//       this._TicketService.updateTicket(this.createTicket.value).subscribe({
//         next:(response)=>{
//           this.closeUpdate()
//           this._TicketService.assignValue()
//         }
//       })

//     }

//   }
//   newTicket():void{

//     if(this.createTicket.valid){
//       this._TicketService.createTicket(this.createTicket.value).subscribe({
//         next:(response)=>{
//           this.closeAdd()
//           this._TicketService.assignValue()
//         }
//       })

//     }


//   }


//   delTicket():void{

//     this._TicketService.deleteTicket(this.ticketWillDelete.id).subscribe({
//       next:(response)=>{
//         this.closeDelete()
//         this._TicketService.assignValue()
//       }

//     })
//   }



}
