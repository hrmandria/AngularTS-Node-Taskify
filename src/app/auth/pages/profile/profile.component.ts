import { UserService } from './../../../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('', [Validators.required])
  });

  public me: any;

  constructor(private user: UserService) {
    this.user.findMe().toPromise().then((u: any) => {
      this.me = u;
      this.form.controls.username.setValue(u.username);
    });
  }

  ngOnInit(): void {
  }


  public async update(): Promise<void>{
    try{
      await this.user.updateUsername(this.form.controls.username.value).toPromise();
      await this.user.updatePassword({
        password: this.form.controls.password.value,
        oldPassword: this.form.controls.oldPassword.value
      }).toPromise();
      location.reload();
    }catch (e){
      alert(e);
    }
  }

  public async updatePhoto(): Promise<void>{
    try{
      const photos: any = document.getElementById('photo');
      const data = new FormData();
      data.append('photo', photos.files[0]);
      await this.user.updatePhoto(data).toPromise();
      location.reload();
    }catch (e){
      alert(e);
    }
  }

}
