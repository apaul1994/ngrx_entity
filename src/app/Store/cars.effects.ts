import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
import {
  addCars,
  addCarsSuccess,
  deleteCar,
  deleteCarSuccess,
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
          map((cars) => getCarsSuccess({ cars })),
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
