import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
// import { filter, map } from 'rxjs';
// import { CarService } from '../Service/car.service';
import { Car } from '../Store/car';
import {
  addCars,
  deleteCar,
  findCarNumber,
  gerErrorMessage,
  getCars,
  getLoaderStatus,
} from '../Store/cars.action';
import { CarState } from '../Store/cars.reducer';
import {
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
  errorMessage$ = this.store.pipe(select(errorSelector));
  loaderStatus$ = this.store.pipe(select(loaderSelector));
  cars$ = this.store.pipe(select(carSelector));
  carNumber$ = this.store.pipe(select(carNumberSelector));

  constructor(
    private fb: FormBuilder,
    private store: Store<CarState>,
    public spinner: NgxSpinnerService
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
}
