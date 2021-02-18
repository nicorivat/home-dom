import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faBox, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { PhilipsLight, PhilipsRoom } from '../../models';
import { PhilipsActions } from '../../store';

@Component({
  selector: 'hd-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
})
export class SwitcherComponent implements OnInit {
  @Input()
  room!: PhilipsRoom;

  @Input()
  light!: PhilipsLight;

  @Output()
  iconClicked: EventEmitter<void> = new EventEmitter<void>();

  isRoom: boolean = false;
  roomIcon: IconDefinition = faBox;
  lightIcon: IconDefinition = faLightbulb;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.isRoom = !!this.room;
  }

  isChecked(): boolean | undefined {
    if (this.isRoom) {
      return this.room?.state.any_on;
    }
    return this.light?.state.on;
  }

  toggleSwitch() {
    if (this.isRoom)
      this.store.dispatch(
        new PhilipsActions.ToggleRoom(this.room.key, !this.room.state.any_on)
      );
    else
      this.store.dispatch(
        new PhilipsActions.ToggleLight(this.light.key, !this.light.state.on)
      );
  }
}
