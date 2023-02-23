import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarService } from '../Service/car.service';
// import { filter, map } from 'rxjs';
// import { CarService } from '../Service/car.service';
import { Car } from '../Store/car';
import {
  addCars,
  deleteCar,
  editCars,
  findCarNumber,
  gerErrorMessage,
  getCars,
  getLoaderStatus,
} from '../Store/cars.action';
import { CarState, ErrorState } from '../Store/cars.reducer';
import {
  carESelector,
  carNumberSelector,
  carSelector,
  errorSelector,
  loaderSelector,
} from '../Store/cars.selector';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent {
  carControl: any;
  public carDetail: Car = new Car();
  public cars: any = [];
  public editId=0;
  public addUpdate=false;
  errorMessage$ = this.storeErr.pipe(select(errorSelector));
  loaderStatus$ = this.storeErr.pipe(select(loaderSelector));
  cars$ = this.store.pipe(select(carESelector));
  carNumber$ = this.store.pipe(select(carNumberSelector));

  constructor(
    private fb: FormBuilder,
    private store: Store<CarState>,
    private storeErr: Store<ErrorState>,
    public spinner: NgxSpinnerService,
    private carservice:CarService
  ) {}

  ngOnInit(): void {
    this.generateForm();
    this.fetchCar();
  }

  generateForm() {
    this.carControl = this.fb.group({
      ownerName: ['', [Validators.required]],
      carNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
          Validators.pattern('[a-zA-Z]{3}[0-9]{3}'),
        ],
      ],
    });
  }

  onSubmit() {
    this.store.dispatch(gerErrorMessage(''));
    this.store.dispatch(getLoaderStatus(true));
    this.carDetail.ownerName = this.carControl.controls.ownerName.value;
    this.carDetail.carNumber = this.carControl.controls.carNumber.value;
    let count = 0;
    this.store.dispatch(findCarNumber(this.carDetail.carNumber));
    this.carNumber$.subscribe((data) => {
      count = data.length;
    });
    // this.store.select('cars').subscribe((data)=>{
    //   data.forEach(element => {
    //     if(element.carNumber==this.carDetail.carNumber){
    //       count++;
    //     }
    //   });
    //   }
    // );
    if (count == 0) {
      this.store.dispatch(addCars(this.carDetail));
    } else {
      this.store.dispatch(getLoaderStatus(false))
      alert('Car Number Already present.');
    }
    this.carControl.reset();
    // this.carservice.addCarDetail(this.carDetail).subscribe((data)=>{
    //   console.log(data);
    //   this.fetchCar();
    // })
    // this.store.dispatch(getLoaderStatus(false));
  }

  fetchCar() {
    this.store.dispatch(gerErrorMessage(''));
    this.store.dispatch(getLoaderStatus(true));
    this.store.dispatch(getCars());
    // this.carservice.fetchDetail().subscribe((data)=>{
    //     this.cars=data;
    // })
  }

  deleteData(id: number) {
    this.store.dispatch(gerErrorMessage(''));
    this.store.dispatch(getLoaderStatus(true));
    this.store.dispatch(deleteCar(id));
    // this.carservice.deleteDetail(id).subscribe((data)=>{
    //   console.log(data);
    //   this.fetchCar()
    // })
    // this.store.dispatch(getLoaderStatus(false));
  }

  updateData(car:Car){
    this.addUpdate=true;
    this.editId=car.id;
    this.carControl.patchValue({
      ownerName:car.ownerName,
      carNumber:car.carNumber
    })
  }
  
  submitUpdate(){
    console.log(this.carControl.value);
    let carEdited=new Car();
    carEdited.carNumber=this.carControl.value.carNumber;
    carEdited.ownerName=this.carControl.value.ownerName;
    carEdited.id=this.editId;
    // this.carservice.editCarDetail(carEdited).subscribe((data)=>console.log(data));
    this.store.dispatch(editCars(carEdited));
    this.carControl.reset();
    this.addUpdate=false;
  }
}
