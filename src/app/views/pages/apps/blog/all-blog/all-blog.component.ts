import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BlogService } from '../services/blog.service';
import { Blog } from '../blog';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-all-blog',
  templateUrl: './all-blog.component.html',
  styleUrls: ['./all-blog.component.scss']
})
export class AllBlogComponent implements OnInit {

  constructor(private _BlogService:BlogService) { }
  myBlogs:Blog[]=[]
  blogActions:Blog={
    content:'',
    frontMatter:{title:'',
  date: 'string',
  draft: false,
  summary: 'string',
  category: 'string',
  images: 'string',
  author: {name: 'string',
    position: 'string',
    image: 'string',
    isEmployee: true,
    isVerified: true
  }
  }} as Blog
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

 
  ngOnInit(): void {this
    this.allBlog()
  }

  allBlog():void{
    this._BlogService.allBlogs.subscribe({
      next:(response)=>{
        this.myBlogs=response
      }
    })
  }
  openDelete(blog:Blog):void{
    $('.deleteDialog').slideDown(400)
    this.blogActions=blog
  }
    closeDelete():void{
      $('.deleteDialog').slideUp(400)

    }
  openUpdate(blog:Blog):void{
    $('.updateDialog').slideDown(400)
    this.blogActions=blog
    this.blogForm.setValue({
      title:this.blogActions.frontMatter.title,
      date:this.blogActions.frontMatter.date,
      summary:this.blogActions.frontMatter.summary,
      content:this.blogActions.content,
      category:this.blogActions.frontMatter.category,
      author: {
        name:this.blogActions.frontMatter.author.name  ,
        position:this.blogActions.frontMatter.author.position ,
        image:'',
        isEmployee: true,
        isVerified: true

      },
      images:''
    })
}
closeUpdate():void{
  $('.updateDialog').slideUp(400)
  this.blogForm.reset('')

}
changeBlog():void{

}
deleteBlog():void{
  this._BlogService.deleteBlog(this.blogActions.id).subscribe({
    next:(response)=>{
      this._BlogService.assignBlogs()
      this.closeDelete()
    }
  })
}
getImageName(event:any):void{

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

