import { Component, OnInit   } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmergencyService } from './service/emergency.service';



@Component({
  selector: 'app-create-emergency',
  templateUrl: './create-emergency.component.html',
  styleUrls: ['./create-emergency.component.scss']
})
export class CreateEmergencyComponent implements OnInit {


  constructor(private _EmergencyService:EmergencyService) { }

  emergForm:FormGroup = new FormGroup({
    title:new FormControl('',[Validators.required]),
    level:new FormControl('',[Validators.required]),
    date:new FormControl('',[Validators.required]),
    summary:new FormControl('',[Validators.required]),
    site:new FormControl('',[Validators.required]),
    location:new FormControl('',[Validators.required])
  })


  ngOnInit(): void {

  }

  handelForm():void{

    if(this.emergForm.valid){
      this._EmergencyService.createEmergency(this.emergForm.value).subscribe({
        next:(response)=>{
          this.emergForm.reset({
            title:'',
            level:'',
            date:'',
            summary:'',
            site:'',
            location:''
          })

        }
      })
    }

  }

}
