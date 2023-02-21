import { createReducer, on } from "@ngrx/store";
import { Car } from "./car";
import { addCars, addCarsSuccess, deleteCarSuccess, findCarNumber, getCars, getCarsSuccess } from "./cars.action";

export interface CarState{
    cars:ReadonlyArray<Car>;
    carNumber:Readonly<string>;
}


export const initialState: ReadonlyArray<Car> =[];

export const carReducer = createReducer(
    initialState,
    on(getCarsSuccess, (state,{cars})=>[...cars]),
    on(addCarsSuccess, (state,car) =>[...state,car]),
    on(deleteCarSuccess, (state,{carId})=>
        state.filter((car)=>car.id !== carId)
    )
)

const initialCarNoState=''
export const carNoReducer = createReducer(
    initialCarNoState,
    on(findCarNumber,(state,{carNumber})=>carNumber)
)

function mockCars():Car[]{
    const car = new Car("ABC", "DEF");
    car.id = 1;
    const car1 = new Car("GHI", "JKL");
    car1.id = 2;
    const car2 = new Car("MNO", "PQR");
    car2.id = 3;

    const cars = [car,car1,car2];
    return cars;
    
}