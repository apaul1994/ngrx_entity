import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
// import { filter, map } from 'rxjs';
// import { CarService } from '../Service/car.service';
import { Car } from '../Store/car';
import { addCars, deleteCar, findCarNumber, getCars } from '../Store/cars.action';
import { CarState } from '../Store/cars.reducer';
import { carNumberSelector, carSelector, errorSelector } from '../Store/cars.selector';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent {
  carControl:any;
  public carDetail: Car= new Car();
  public cars:any = [];
  errorMessage$ = this.store.pipe(select(errorSelector));

  cars$ = this.store.pipe(select(carSelector));
  carNumber$=this.store.pipe(select(carNumberSelector));

  constructor(private fb:FormBuilder, 
            private store:Store<CarState>) { 
    
  }
  
  ngOnInit(): void {
    this.generateForm();
    this.fetchCar();
  }
  
  
  generateForm(){
    this.carControl=this.fb.group({
      ownerName:['', [Validators.required]],
      carNumber:['', [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern('[a-zA-Z]{3}[0-9]{3}')]]
    })
  }



  onSubmit(){
    this.carDetail.ownerName = this.carControl.controls.ownerName.value;
    this.carDetail.carNumber = this.carControl.controls.carNumber.value;
    let count=0;
    this.store.dispatch(findCarNumber(this.carDetail.carNumber))
    this.carNumber$.subscribe((data)=>{
      count=data.length
    })
    // this.store.select('cars').subscribe((data)=>{
    //   data.forEach(element => {
    //     if(element.carNumber==this.carDetail.carNumber){
    //       count++;
    //     }
    //   });
    //   }
    // );
    if(count==0){
      this.store.dispatch(addCars(this.carDetail));
    }
    else{
      alert("Car Number Already present.");
    }
    this.carControl.reset();
    // this.carservice.addCarDetail(this.carDetail).subscribe((data)=>{
    //   console.log(data);
    //   this.fetchCar();
    // })
  }

  fetchCar(){
    const status = this.store.dispatch(getCars());

    // this.carservice.fetchDetail().subscribe((data)=>{
    //     this.cars=data;
    // })
  }

  deleteData(id:number){
    this.store.dispatch(deleteCar(id));
    // this.carservice.deleteDetail(id).subscribe((data)=>{
    //   console.log(data);
    //   this.fetchCar()
    // })
  }

 
}
