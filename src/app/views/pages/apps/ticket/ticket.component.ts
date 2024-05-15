import { Component, OnInit } from '@angular/core';
import { TicketService } from './services/ticket.service';
import { Ticket } from './ticket';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Hospital } from '../hospital/hospital';
import { HospitalService } from '../hospital/services/hospital.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class ticketComponent implements OnInit {


  constructor(private _TicketService:TicketService,
    private _HospitalService:HospitalService
  ) { }
  tickets:Ticket[]
  myHospital:Hospital[]
  ticketWillDelete:any=''
  createTicket:FormGroup= new FormGroup({
    ownerEmail: new FormControl('',[Validators.email,Validators.required]),
    hospitalID: new FormControl('',[Validators.required]),
    donationDate: new FormControl('',[Validators.required]),
    transferDate: new FormControl('',[Validators.required]),
    expiryDate: new FormControl('',[Validators.required]),
  })

  ngOnInit(): void {
      this.allTickets()
      this.allHospital()
  }

  openUpdate(ticket:Ticket){
    this.createTicket.setValue({ownerEmail:ticket.ownerEmail ,
       hospitalID:ticket.hospitalID ,
       donationDate:ticket.donationDate,
       expiryDate:ticket.expiryDate,
       transferDate:ticket.transferDate,
      })
      $('.updateDialog').slideDown(400)
  }
  closeUpdate():void{
    this.createTicket.reset('')
    $('.updateDialog').slideUp(400)
  }
  openDelete(ticket:Ticket){
      this.ticketWillDelete=ticket
      $('.deleteDialog').slideDown(400)
  }
  closeDelete():void{
    $('.deleteDialog').slideUp(400)
  }

  openAdd():void{
    $('.addDialog').slideDown(400)
  }
  closeAdd():void{
    $('.addDialog').slideUp(400)
  }
  allTickets():void{
    this._TicketService.allTickets.subscribe({
      next:(response)=>{
        this.tickets=response
      }
    })
  }
  updateTicket():void{

    if(this.createTicket.valid){
      this._TicketService.updateTicket(this.createTicket.value).subscribe({
        next:(response)=>{
          this.closeUpdate()
          this._TicketService.assignValue()
        }
      })

    }

  }
  newTicket():void{
    if(this.createTicket.valid){
      this._TicketService.createTicket(this.createTicket.value).subscribe({
        next:(response)=>{
          this.closeAdd()
          this._TicketService.assignValue()
        }
      })
    }
  }
  delTicket():void{

    this._TicketService.deleteTicket(this.ticketWillDelete.id).subscribe({
      next:(response)=>{
        this.closeDelete()
        this._TicketService.assignValue()
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
