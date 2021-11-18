import { PostService } from './../../../services/post/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public posts = new Array<any>();

  constructor(private post: PostService) { }

  ngOnInit(): void {
    try {
      this.post.findMine().subscribe((res: any) => this.posts = res);
    }catch (e){
      alert(e);
    }
  }

  public async remove(id: string): Promise<void>{
    try{
      await this.post.remove(id).toPromise();
      location.reload();
    }catch (e){ alert(e); }
  }
}
