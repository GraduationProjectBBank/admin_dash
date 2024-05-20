import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  constructor( private _BlogService:BlogService) { }
  imageName:string
  blogForm:FormGroup = new FormGroup({
    title:new FormControl('',[Validators.required]),
    author: new FormGroup({
      name:  new FormControl('',[Validators.required]),
      position: new FormControl('',[Validators.required]),
      image: new FormControl('',[Validators.required]),
      isEmployee: new FormControl(true),
      isVerified: new FormControl(true)
    }),
    date:new FormControl('',[Validators.required]),
    summary:new FormControl('',[Validators.required]),
    content:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    images:new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }


  handelForm():void{
    const nestedForm = this.blogForm.get('author') as FormGroup

    if(this.blogForm.valid && nestedForm.valid){
      this._BlogService.createBlog(this.blogForm.value).subscribe({
        next:(response)=>{
          console.log(response);
        }
      })

    }

  }


  getImageName(event:any):void{
    this.imageName=event.target.files[0].name

  }

}
