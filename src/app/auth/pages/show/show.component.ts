import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  public currentPost: any;
  public currentImage = '';
  public comment = '';

  constructor(private post: PostService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(async (param) => {
      try{
        this.currentPost = await this.post.findOne(param.id).toPromise();
        console.log(this.currentPost);
      }catch (e){ alert(e); }
    });
  }

  public changeImage(url: string): void{
    this.currentImage = url;
  }

  ngOnInit(): void {
  }

  public async postComment(): Promise<void>{
    try{
      await this.post.comment({content: this.comment}, this.currentPost._id).toPromise();
      location.reload();
    }catch (e){ alert(e); }
  }

  public play(): void{
    const audio: any = document.getElementById('audio');
    audio.currentTime = 0;
    audio.play();
  }

  public stop(): void{
    const audio: any = document.getElementById('audio');
    audio.currentTime = 0;
    audio.pause();
  }

}
