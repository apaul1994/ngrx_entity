import { EntityState, createEntityAdapter } from "@ngrx/entity";
// import { createEntityAdapter } from "@ngrx/entity/src";
import { createReducer, on } from "@ngrx/store";
import { Car } from "./car";
import { addCars, addCarsSuccess, deleteCarSuccess, editCarsSuccess, editECarsSuccess, findCarNumber, gerErrorMessage, getCars, getCarsSuccess, getLoaderStatus } from "./cars.action";

export interface CarState{
    cars:ReadonlyArray<Car>;
    carNumber:Readonly<string>;
}

export interface ErrorState{
    errorMessage:Readonly<string>;
    loaderStatus:Readonly<boolean>;

}

export interface appState{
    carstate:CarState;
    errorstate:ErrorState;
}

export interface CarEState extends EntityState<Car>{}

export const carsAdapter = createEntityAdapter<Car>();

export const initialCarEState = carsAdapter.getInitialState();




export const initialState: ReadonlyArray<Car> =[];

export const carReducer = createReducer(
    initialState,
    // on(getCarsSuccess, (state,{cars})=>[...state,...cars]),
    // on(addCarsSuccess, (state,car) =>[...state,car]),
    // on(deleteCarSuccess, (state,{carId})=>
    //     state.filter((car)=>car.id !== carId)
    // ),
    // on(editCarsSuccess, (state,car)=>{
    //     const cars = state.map((c)=>{
    //         if(c.id === car.id){
    //             return car;
    //         }
    //         return c;
    //     }); 
    //     return cars;
    // })
)

export const carEReducer = createReducer(
    initialCarEState,
    on(getCarsSuccess, (state,cars)=>carsAdapter.setAll(cars.cars,state)),
    on(addCarsSuccess, (state,car)=>carsAdapter.addOne(car,{...state})),
    on(deleteCarSuccess,(state,carId)=>carsAdapter.removeOne(carId.carId,state)),
    on(editECarsSuccess,(state,car)=>carsAdapter.updateOne(car,state) )
)

const initialCarNoState=''
export const carNoReducer = createReducer(
    initialCarNoState,
    on(findCarNumber,(state,{carNumber})=>carNumber)
)


const initialloaderStatus=false
export const loaderReducer = createReducer(
    initialloaderStatus,
    on(getLoaderStatus,(state,{loaderStatus})=>loaderStatus)
)


const initialErrorState=''
export const errorReducer = createReducer(
    initialErrorState,
    on(gerErrorMessage,(state,{errorMessage})=>errorMessage)
)

