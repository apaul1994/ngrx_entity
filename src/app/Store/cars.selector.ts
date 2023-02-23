import { state } from "@angular/animations";
import {  createFeatureSelector, createSelector } from "@ngrx/store";
import { Car } from "./car";
import { CarEState, carsAdapter, CarState, ErrorState } from "./cars.reducer";

export const carSelector = createSelector(
    (state:CarState) => state.cars,
    (cars:ReadonlyArray<Car>)=> cars
)
export const errorSelector = createSelector(
    // (state:CarState) => state.errorMessage,
    (state:ErrorState) => state.errorMessage,
    (errorMessage:Readonly<string>)=> errorMessage
)
export const loaderSelector = createSelector(
    // (state:CarState) => state.loaderStatus,
    (state:ErrorState) => state.loaderStatus,
    (loaderStatus:Readonly<boolean>)=> loaderStatus
)
export const carNumberSelector = createSelector(
    (state:CarState) => state.cars,
    (state:CarState) => state.carNumber,
    (cars:ReadonlyArray<Car>, carNumber:Readonly<string>)=> {
        return cars.filter((car:Car)=>car.carNumber === carNumber)
    }
)

export const carsSelector = carsAdapter.getSelectors();
export const getCarsState = createFeatureSelector<CarEState>('carsE');
export const carESelector = createSelector(
    getCarsState,
    carsSelector.selectAll
)