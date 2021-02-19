import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DestroyableComponent,
  PhilipsActions,
  PhilipsLight,
  PhilipsRoom,
  PhilipsState
} from '../../../../shared';

@Component({
  selector: 'hd-room-page',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPageComponent extends DestroyableComponent implements OnInit {
  @Select(PhilipsState.getState(['currentRoom']))
  currentRoom$!: Observable<PhilipsRoom>;

  @Select(PhilipsState.getState(['lights']))
  lights$!: Observable<PhilipsLight[]>;

  translatePath: string = 'philips.room.';

  private lightsInterval!: NodeJS.Timeout;

  constructor(private readonly store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new PhilipsActions.GetLights());
    this.lightsInterval = setInterval(
      () => this.store.dispatch(new PhilipsActions.GetLights()),
      2000
    );
  }

  OnDestroy(): void {
    clearInterval(this.lightsInterval);
  }
}
