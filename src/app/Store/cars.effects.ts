import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity/src';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  EMPTY,
  EmptyError,
  exhaustMap,
  map,
  mergeMap,
  tap,
} from 'rxjs';
import { CarService } from '../Service/car.service';
import { Car } from './car';
import {
  addCars,
  addCarsSuccess,
  deleteCar,
  deleteCarSuccess,
  editCars,
  editCarsSuccess,
  editECarsSuccess,
  gerErrorMessage,
  getCars,
  getCarsSuccess,
  getLoaderStatus,
} from './cars.action';
import { CarState } from './cars.reducer';

@Injectable()
export class CarsEffects {
  loadCar$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCars),
      exhaustMap(() =>
        this.carservice.fetchDetailRx().pipe(
          // map((cars) => getCarsSuccess({cars})),
          map((cars) => getCarsSuccess(cars)),
          tap(() => this.store.dispatch(getLoaderStatus(false))),
          catchError((err, caught) => {
            console.log('message=>', err);
            this.store.dispatch(getLoaderStatus(false));
            this.store.dispatch(gerErrorMessage(err.message));
            return EMPTY;
          })
        )
      )
    )
  );

  addCar$ = createEffect(() =>
    this.action$.pipe(
      ofType(addCars),
      concatMap((newCar) =>
        this.carservice.addCarDetailRx(newCar).pipe(
          map((cars) => addCarsSuccess(cars)),
          tap(() => this.store.dispatch(getLoaderStatus(false))),
          catchError((err, caught) => {
            this.store.dispatch(gerErrorMessage(err.message));
            this.store.dispatch(getLoaderStatus(false));
            return EMPTY;
          })
        )
      )
    )
  );


  editCar$ = createEffect(() =>{
    return this.action$.pipe(
      ofType(editCars),
      concatMap((editCar) =>{
        return this.carservice.editCarDetailRx(editCar).pipe(
          map((cars) => {
            const editedCar: Update<Car> = {
              id:editCar.id,
              changes:{
                ...editCar
              }
            }
            this.store.dispatch(getLoaderStatus(false))
            return editECarsSuccess(editedCar)
          }),
          // tap(() => this.store.dispatch(getLoaderStatus(false))),
          catchError((err, caught) => {
            this.store.dispatch(gerErrorMessage(err.message));
            this.store.dispatch(getLoaderStatus(false));
            return EMPTY;
          })
        )
        }
      )
    )
  }
  );

  // editCar$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(editCars),
  //     concatMap((editCar) =>
  //       this.carservice.editCarDetailRx(editCar).pipe(
  //         // map((cars) => editCarsSuccess(cars)),
  //         map((cars) => editCarsSuccess(cars)),
  //         tap(() => this.store.dispatch(getLoaderStatus(false))),
  //         catchError((err, caught) => {
  //           this.store.dispatch(gerErrorMessage(err.message));
  //           this.store.dispatch(getLoaderStatus(false));
  //           return EMPTY;
  //         })
  //       )
  //     )
  //   )
  // );

  deleteCar$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteCar),
      mergeMap(({ carId }) =>
        this.carservice.deleteDetailRx(carId).pipe(
          map(() => deleteCarSuccess(carId)),
          tap(() => this.store.dispatch(getLoaderStatus(false))),
          catchError((err, caught) => {
            this.store.dispatch(gerErrorMessage(err.message));
            this.store.dispatch(getLoaderStatus(false));
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private carservice: CarService,
    private store: Store<CarState>
  ) {}
}
