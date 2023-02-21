import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { carNoReducer, carReducer, errorReducer } from './Store/cars.reducer';
import { CarService } from './Service/car.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({cars:carReducer,carNumber:carNoReducer, errorMessage:errorReducer}),
      ],
      declarations: [
        AppComponent,
        CarDetailComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('carCrudApp app is running!');
  // });
});
