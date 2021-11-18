import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../../services/post/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  public currentPost: any;

  constructor(
    private post: PostService,
    private router: Router,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(async (param) => {
      if (param.id) {
        try {
          this.currentPost = await this.post.findOne(param.id).toPromise();
          console.log(this.currentPost);
          this.form.controls.title.setValue(this.currentPost.title);
          this.form.controls.text.setValue(this.currentPost.details);
        } catch (e) {
          alert(e);
        }
      }
    });
  }

  ngOnInit(): void {}

  public async submit(): Promise<void> {
    try {
      let post: any = this.currentPost;

      if (!post) {
        console.log('Ok');
        post = await this.post
          .create({
            colors: [''],
            title: this.form.controls.title.value,
            details: this.form.controls.text.value,
          })
          .toPromise();
      } else {
        await this.post
          .update(
            {
              colors: [''],
              title: this.form.controls.title.value,
              details: this.form.controls.text.value,
            },
            post._id
          )
          .toPromise();
      }

      const images: any = document.getElementById('photos');
      const photos = images.files;
      const data: any = document.getElementById('song');
      const song = data.files[0];

      const imageFormData = new FormData();

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < photos.length; i++) {
        imageFormData.append('pictures', photos[i]);
      }

      const songFormData = new FormData();
      songFormData.append('song', song);

      await this.post.updatePhoto(imageFormData, post._id).toPromise();
      await this.post.updateSong(songFormData, post._id).toPromise();

      this.router.navigateByUrl('/auth/posts');
    } catch (e) {
      alert(e);
    }
  }
}
