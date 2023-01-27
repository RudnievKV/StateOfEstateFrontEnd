import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-property-change',
  templateUrl: './property-change.component.html',
  styleUrls: ['./property-change.component.scss']
})
export class PropertyChangeComponent {
  value = '';
  value1 = '';
  value2 = '';


  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  toppings1 = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  constructor(private _formBuilder: FormBuilder) {}


  display:any;
  center: google.maps.LatLngLiteral = {lat:24, lng:12};
  zoom = 4;
}
