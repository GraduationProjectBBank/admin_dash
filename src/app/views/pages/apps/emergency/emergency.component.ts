import { Component, OnInit   } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss']
})
export class EmergencyComponent implements OnInit {


  constructor() { }

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


}
