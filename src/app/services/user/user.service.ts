import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  private base = '/user';

  private headers = new HttpHeaders({
    authorization: sessionStorage.getItem('X-TOKEN') || ''
  });

  constructor(private http: HttpClient, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const token = sessionStorage.getItem('X-TOKEN');
    if (!token){
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

  public create(user: {username: string, password: string}): Observable<any>{ return this.http.post(environment.url + this.base, user); }

  public login(user: {username: string, password: string}): Observable<any>{
    return this.http.post(environment.url + this.base + '/login', user);
  }

  public findMe(): Observable<any>{ return this.http.get(environment.url + this.base, { headers : this.headers}); }

  public findOne(id: string): Observable<any>{ return this.http.get(environment.url + this.base + '/one/' + id); }

  public removeMe(): Observable<any>{ return this.http.delete(environment.url + this.base, { headers : this.headers}); }

  public updatePassword(pass: {password: string, oldPassword: string}): Observable<any>{
    return this.http.patch(environment.url + this.base + '/password', pass, {headers: this.headers});
  }

  public updateUsername(username: string): Observable<any>{
    return this.http.patch(environment.url + this.base + '/username', {username}, {headers: this.headers});
  }

  public updatePhoto(data: FormData): Observable<any>{
    return this.http.patch(environment.url + this.base + '/photo', data, {headers: this.headers});
  }

}
