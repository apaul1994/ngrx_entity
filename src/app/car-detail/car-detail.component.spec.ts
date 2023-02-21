import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CarsEffects } from '../Store/cars.effects';
import { carNoReducer, carReducer, errorReducer } from '../Store/cars.reducer';

import { CarDetailComponent } from './car-detail.component';

describe('CarDetailComponent', () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailComponent ],
      imports:[ReactiveFormsModule,
        StoreModule.forRoot({cars:carReducer,carNumber:carNoReducer, errorMessage:errorReducer}),
        EffectsModule.forRoot([CarsEffects]),
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Reactive Form Validation - Owner name check', () => {
    let ownerName =component.carControl.controls['ownerName'];
    expect(ownerName.valid).toBeFalsy();
    expect(ownerName.errors['required']).toBeTruthy();
  });

  it('Reactive Form Validation - set Owner name check', () => {
    let ownerName =component.carControl.controls['ownerName'];
    ownerName.setValue('Amit');
    expect(ownerName.valid).toBeTruthy();
    expect(ownerName.value).toEqual('Amit');
  });


  it('Reactive Form Validation - set CAR Number check', () => {
    let carNumber =component.carControl.controls['carNumber'];
    carNumber.setValue('WAE345');
    expect(carNumber.valid).toBeTruthy();
    expect(carNumber.value).toEqual('WAE345');
  });


  it('Reactive Form Validation - set CAR Number check', () => {
    let carNumber =component.carControl.controls['carNumber'];
    carNumber.setValue('WAER45');
    expect(carNumber.valid).toBeFalsy();
    expect(carNumber.value).toEqual('WAER45');
  });

  it('Reactive Form Validation - form Submit', () => {
    expect(component.carControl.invalid).toBeTruthy()
    let ownerName =component.carControl.controls['ownerName'];
    let carNumber =component.carControl.controls['carNumber'];
    carNumber.setValue('WAER45');
    ownerName.setValue('Aman');
    let btn = fixture.debugElement.query(By.css('input[type=submit'))
    
    component.onSubmit();
    fixture.detectChanges();

    expect(carNumber.value).toEqual(null)
    expect(ownerName.value).toEqual(null)
  });
  
});
