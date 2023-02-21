import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, EMPTY, EmptyError, exhaustMap, map, mergeMap, tap } from "rxjs";
import { CarService } from "../Service/car.service";
import { addCars, addCarsSuccess, deleteCar, deleteCarSuccess, gerErrorMessage, getCars, getCarsSuccess } from "./cars.action";
import { CarState } from "./cars.reducer";

@Injectable()
export class CarsEffects {
    
    loadCar$ = createEffect(()=>this.action$.pipe(
        ofType(getCars),
        exhaustMap(()=>this.carservice.fetchDetailRx().pipe(
            map(cars=> getCarsSuccess({cars})),
            catchError((err, caught) => {
                console.log("message=>",err);
                this.store.dispatch(gerErrorMessage(err.message))
                return EMPTY;
              })
        ))
    ))

    addCar$ = createEffect(()=>this.action$.pipe(
        ofType(addCars),
        concatMap((newCar)=>this.carservice.addCarDetailRx(newCar).pipe(
            map(cars=> addCarsSuccess(cars)),
            catchError((err, caught) => {
                this.store.dispatch(gerErrorMessage(err.message))
                return EMPTY;
              })
        ))
    ))

    deleteCar$ = createEffect(()=>this.action$.pipe(
        ofType(deleteCar),
        mergeMap(({carId})=>this.carservice.deleteDetailRx(carId).pipe(
            map(()=> deleteCarSuccess(carId)),
            catchError((err, caught) => {
                this.store.dispatch(gerErrorMessage(err.message))
                return EMPTY;
              })
        ))
    ))

    
    constructor(private action$:Actions, private carservice:CarService,  private store:Store<CarState>){

    }
}
