import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Car } from '../Store/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http:HttpClient) { }

  public url="http://localhost:3000/posts/"
  addCarDetail(data:any){
    return this.http.post(this.url,data);
  }

  deleteDetail(id:number){
    return this.http.delete(this.url+id);
  }

  fetchDetail(){
    return this.http.get(this.url);
  }
  fetchDetailRx(){
    return this.http.get<ReadonlyArray<Car>>(this.url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  };

  addCarDetailRx(data:any){
    return this.http.post<Car>(this.url,data).pipe(
        catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteDetailRx(id:number){
    return this.http.delete(this.url+id).pipe(
      catchError((error: HttpErrorResponse) => {
      return throwError(error.message);
    })
  );
  }
  }

