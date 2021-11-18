import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  public posts = new Array<any>();

  constructor(private post: PostService, actuvatedRoute: ActivatedRoute) {
    actuvatedRoute.params.subscribe(async (param) => {
      this.posts = await this.post.search(param.q).toPromise();
    });
  }

}
