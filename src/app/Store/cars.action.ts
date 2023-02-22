import { createAction, props } from "@ngrx/store";
import { Car } from "./car";

export const getCars = createAction('[CAR] Get car');
export const getCarsSuccess = createAction('[CAR] Get car Success', props<{cars:ReadonlyArray<Car>}>());
export const addCars = createAction('[CAR] Add car', (car:Car)=>car);
export const addCarsSuccess = createAction('[CAR] Add car Success', (car:Car)=>car);
export const deleteCar = createAction('[CAR] Delete car', (carId:number)=>({carId}));
export const deleteCarSuccess = createAction('[CAR] Delete car Success', (carId:number)=>({carId}));
export const findCarNumber = createAction('[CAR] find car',(carNumber:string)=>({carNumber}))
export const gerErrorMessage = createAction('[ERR] get error',(errorMessage:string)=>({errorMessage}))
export const getLoaderStatus = createAction('[LOADER] get loader status',(loaderStatus:boolean)=>({loaderStatus}))
