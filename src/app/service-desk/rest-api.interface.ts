import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export interface RestApi {
  get(url : string) : Observable<Response>;
  post(url : string, data : any) : Observable<Response>;
  put(url : string, data : any) : Observable<Response>;
  delete(url : string) : Observable<Response>; 
}
