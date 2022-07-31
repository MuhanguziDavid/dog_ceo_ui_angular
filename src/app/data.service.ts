import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "https://dog.ceo/api/breeds/image/random/9";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(): Observable<any>{
    return this.httpClient.get<any>(this.REST_API_SERVER);
  }

}
