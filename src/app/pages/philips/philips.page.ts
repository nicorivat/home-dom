import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PhilipsState } from '../../shared';

@Component({
  selector: 'hd-philips-page',
  templateUrl: './philips.page.html',
  styleUrls: ['./philips.page.scss'],
})
export class PhilipsPageComponent {
  @Select(PhilipsState.getState(['token']))
  token$!: Observable<string>;

  translatePath: string = 'philips.';
}
