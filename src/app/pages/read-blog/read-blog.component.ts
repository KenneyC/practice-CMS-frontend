import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Blog } from 'src/app/models/blog';
import { BlogServices } from 'src/app/services/blog';

@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.scss']
})
export class ReadBlogComponent implements OnInit {
  blogs: Array<Blog> = [];

  constructor(private blogServices: BlogServices) { }

  ngOnInit(): void {
    this.blogServices.getAllBlog().pipe(first()).subscribe(
      data => {
        console.log(data);
        this.blogs = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
