import { state } from "@angular/animations";
import {  createSelector } from "@ngrx/store";
import { Car } from "./car";
import { CarState } from "./cars.reducer";

export const carSelector = createSelector(
    (state:CarState) => state.cars,
    (cars:ReadonlyArray<Car>)=> cars
)
export const errorSelector = createSelector(
    (state:CarState) => state.errorMessage,
    (errorMessage:Readonly<string>)=> errorMessage
)
export const loaderSelector = createSelector(
    (state:CarState) => state.loaderStatus,
    (loaderStatus:Readonly<boolean>)=> loaderStatus
)
export const carNumberSelector = createSelector(
    (state:CarState) => state.cars,
    (state:CarState) => state.carNumber,
    (cars:ReadonlyArray<Car>, carNumber:Readonly<string>)=> {
        return cars.filter((car:Car)=>car.carNumber === carNumber)
    }
)