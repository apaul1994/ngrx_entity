import { Component } from '@angular/core';
import { select,Store } from '@ngrx/store';
import { CarState } from './Store/cars.reducer';
import { loaderSelector } from './Store/cars.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carCrudApp';

  loaderStatus$ = this.store.pipe(select(loaderSelector));
  constructor(private store:Store<CarState>,){

  }
}
