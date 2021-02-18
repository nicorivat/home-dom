import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DestroyableComponent,
  PhilipsActions,
  PhilipsRoom,
  PhilipsState
} from '../../../../shared';

@Component({
  selector: 'hd-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent extends DestroyableComponent implements OnInit {
  @Select(PhilipsState.getState(['rooms']))
  rooms$!: Observable<PhilipsRoom[]>;

  private roomsInterval!: NodeJS.Timeout;

  constructor(private readonly store: Store, private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new PhilipsActions.GetRooms());
    this.roomsInterval = setInterval(
      () => this.store.dispatch(new PhilipsActions.GetRooms()),
      2000
    );
  }

  navigateToRoom(room: PhilipsRoom): void {
    this.store.dispatch(new PhilipsActions.SetCurrentRoom(room));
    this.router.navigate(['philips/room']);
  }

  OnDestroy(): void {
    clearInterval(this.roomsInterval);
  }
}
