import { Component, OnInit   } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmergencyService } from '../create-emergency/service/emergency.service';
import { Emergency } from './emergency';



@Component({
  selector: 'app-all-emergency',
  templateUrl: './all-emergency.component.html',
  styleUrls: ['./all-emergency.component.scss']
})
export class AllEmergencyComponent implements OnInit {

  myEmergency:Emergency[]
  constructor(private _EmergencyService:EmergencyService) { }

  emergForm:FormGroup = new FormGroup({
    title:new FormControl('',[Validators.required]),
    level:new FormControl('',[Validators.required]),
    date:new FormControl('',[Validators.required]),
    summary:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    location:new FormControl('',[Validators.required])
  })
  emergencyActions:Emergency


  ngOnInit(): void {
    this.allEmergency()
  }

  toggelAdd():void{
    $('.addDialog').slideToggle(400)
  }
  openDelete(emergency:Emergency):void{
    $('.deleteDialog').slideDown(400)
    this.emergencyActions=emergency
  }
    closeDelete():void{
      $('.deleteDialog').slideUp(400)

    }
  openUpdate(emergency:Emergency):void{
    $('.updateDialog').slideDown(400)
    this.emergForm.setValue({
      title:emergency.frontMatter.title,
      level:emergency.frontMatter.level,
      date:emergency.frontMatter.date,
      summary:emergency.frontMatter.summary,
      category:emergency.frontMatter.category,
      location:emergency.frontMatter.location
    })


  }
    closeUpdate():void{
      $('.updateDialog').slideUp(400)
      this.emergForm.reset({
        title:'',
        level:'',
        date:'',
        summary:'',
        site:'',
        location:''
      })

    }
    allEmergency():void{
      this._EmergencyService.getEmergency().subscribe({
        next:(response)=>{
          this.myEmergency=response
        }
      })
    }
    changeEmergency():void{

      if(this.emergForm.valid){
        this._EmergencyService.updateEmergency(this.emergForm.value).subscribe({
          next:(response)=>{
            this.allEmergency()

          }
        })
      }

    }


}
