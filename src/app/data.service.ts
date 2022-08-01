import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private random_dog_breeds_url = "https://dog.ceo/api/breeds/image/random/9";
  private dog_breeds_list_url = "https://dog.ceo/api/breeds/list/all";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  public getRandomDogBreeds(){
    return this.httpClient.get(this.random_dog_breeds_url).pipe(retry(2), catchError(this.handleError));
  }

  public getDogBreedsList(){
    return this.httpClient.get(this.dog_breeds_list_url).pipe(retry(2), catchError(this.handleError));
  }

}
