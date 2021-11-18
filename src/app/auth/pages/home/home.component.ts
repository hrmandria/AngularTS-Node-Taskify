import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public posts = new Array<any>();

  constructor(private post: PostService) { }

  ngOnInit(): void {
    try {
      this.post.findAll().subscribe((res: any) => {
        this.posts = res;
        console.log(res);
      });
    }catch (e){
      alert(e);
    }
  }

}
