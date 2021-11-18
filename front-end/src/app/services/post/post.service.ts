import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateComment, CreatePost, UpdatePost } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService implements CanActivate {
  private base = '/post';

  private headers = new HttpHeaders({
    authorization: sessionStorage.getItem('X-TOKEN') || '',
  });

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = sessionStorage.getItem('X-TOKEN');
    if (token) {
      this.router.navigateByUrl('/auth');
    }
    return true;
  }

  public create(post: CreatePost): Observable<any> {
    return this.http.post(environment.url + this.base, post, {
      headers: this.headers,
    });
  }

  public comment(comment: CreateComment, id: string): Observable<any> {
    return this.http.post(
      environment.url + this.base + '/comment/' + id,
      comment,
      { headers: this.headers }
    );
  }

  public update(post: UpdatePost, id: string): Observable<any> {
    return this.http.patch(environment.url + this.base + '/one/' + id, post, {
      headers: this.headers,
    });
  }

  public updateSong(data: FormData, id: string): Observable<any> {
    return this.http.patch(environment.url + this.base + '/song/' + id, data, {
      headers: this.headers,
    });
  }

  public updatePhoto(data: FormData, id: string): Observable<any> {
    return this.http.patch(
      environment.url + this.base + '/pictures/' + id,
      data,
      { headers: this.headers }
    );
  }

  public findOne(id: string): Observable<any> {
    return this.http.get(environment.url + this.base + '/one/' + id);
  }

  public findAll(): Observable<any> {
    return this.http.get(environment.url + this.base + '/all');
  }

  public search(q: string): Observable<any> {
    return this.http.get(environment.url + this.base + '/search/' + q);
  }

  public like(id: string): Observable<any> {
    return this.http.get(environment.url + this.base + '/like/' + id);
  }

  public findMine(): Observable<any> {
    return this.http.get(environment.url + this.base + '/me', {
      headers: this.headers,
    });
  }

  public remove(id: string): Observable<any> {
    return this.http.delete(environment.url + this.base + '/one/' + id, {
      headers: this.headers,
    });
  }

  public removeComment(id: string, commentId: string): Observable<any> {
    return this.http.delete(
      environment.url + this.base + '/comment/' + id + '/' + commentId,
      { headers: this.headers }
    );
  }
}
