import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, EMPTY, EmptyError, exhaustMap, map, mergeMap, tap } from "rxjs";
import { CarService } from "../Service/car.service";
import { addCars, addCarsSuccess, deleteCar, deleteCarSuccess, getCars, getCarsSuccess } from "./cars.action";

@Injectable()
export class CarsEffects {

    loadCar$ = createEffect(()=>this.action$.pipe(
        ofType(getCars),
        exhaustMap(()=>this.carservice.fetchDetailRx().pipe(
            map(cars=> getCarsSuccess({cars})),
            catchError(()=>EMPTY)
        ))
    ))

    addCar$ = createEffect(()=>this.action$.pipe(
        ofType(addCars),
        concatMap((newCar)=>this.carservice.addCarDetailRx(newCar).pipe(
            map(cars=> addCarsSuccess(cars)),
            catchError(()=>EMPTY)
        ))
    ))

    deleteCar$ = createEffect(()=>this.action$.pipe(
        ofType(deleteCar),
        mergeMap(({carId})=>this.carservice.deleteDetailRx(carId).pipe(
            map(()=> deleteCarSuccess(carId)),
            catchError(()=>EMPTY)
        ))
    ))

    
    constructor(private action$:Actions, private carservice:CarService){

    }
}
