import { Component, OnInit } from '@angular/core';
import { TicketService } from './services/ticket.service';
import { Ticket } from './ticket';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class ticketComponent implements OnInit {


  constructor(private _TicketService:TicketService,
  ) { }
  tickets:Ticket[]
  open:boolean
  delOpen:boolean = false
  upOpen:boolean = false
  imgName:string
  ticketWillDelete:Ticket
  createTicket:FormGroup= new FormGroup({
    ownerEmail: new FormControl('',[Validators.email,Validators.required]),
    hospitalID: new FormControl('',[Validators.required]),
    donationDate: new FormControl('',[Validators.required]),
    transferDate: new FormControl('',[Validators.required]),
    expiryDate: new FormControl('',[Validators.required]),
    imageURL: new FormControl('',[Validators.required]),
  })

  ngOnInit(): void {
      this.allTickets()
  }

  allTickets():void{
    this._TicketService.getTickets().subscribe({
      next:(response)=>{
            this.tickets = response
      }
    })
  }

  openUpdate(ticket:Ticket){
    this.createTicket.setValue({ownerEmail:ticket.ownerEmail ,
       hospitalID:ticket.hospitalID ,
       donationDate:ticket.donationDate,
       expiryDate:ticket.expiryDate,
       transferDate:ticket.transferDate,
       imageURL:ticket.imageURL
      })
      this.imgName=ticket.imageURL

    this.upOpen=true

  }
  closeUpdate():void{
    this.createTicket.reset('')
    this.imgName=''
    this.upOpen=false
  }
  updateTicket():void{

    if(this.createTicket.valid){
      this._TicketService.updateTicket(this.createTicket.value).subscribe({
        next:(response)=>{
          this.upOpen=false
          this.allTickets()
        }
      })

    }

  }
  newTicket():void{

    if(this.createTicket.valid){
      this._TicketService.createTicket(this.createTicket.value).subscribe({
        next:(response)=>{
          this.open=false
          this.allTickets()
        }
      })

    }


  }

  openDelete(ticket:Ticket):void{
    this.delOpen=true
    this.ticketWillDelete=ticket
  }

  delTicket():void{

    this._TicketService.deleteTicket(this.ticketWillDelete.id).subscribe({
      next:(response)=>{
        this.delOpen=false
        this.allTickets()
      }

    })
  }

  getImageName(e:any):void{
    this.imgName=e.target.files[0].name

  }


}
