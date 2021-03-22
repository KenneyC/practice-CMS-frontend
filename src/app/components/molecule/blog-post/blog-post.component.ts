import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  @Input('title') title: string = ''; 
  @Input('name') author: string = '';
  @Input('datestring') datestring: string = '';
  @Input('mainBody') mainbody: string = '';
  date: string; 

  constructor() { }

  ngOnInit(): void {
    console.log(this.mainbody);
    this.date = (new Date(this.datestring)).toLocaleDateString();
  }

}
