import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { HomeComponent } from './pages/home/home.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResultComponent } from './pages/result/result.component';
import { ShowComponent } from './pages/show/show.component';

const routes: Routes = [
  { path: '',
    component: AuthComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'new-post', component: NewPostComponent},
      { path: 'update/:id', component: NewPostComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'posts', component: PostsComponent},
      { path: 'search/:q', component: ResultComponent},
      { path: 'post/:id', component: ShowComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
