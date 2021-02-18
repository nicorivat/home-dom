import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
  DestroyableComponent,
  PhilipsActions,
  PhilipsState
} from '../../../../shared';

@Component({
  selector: 'hd-ip-modal',
  templateUrl: './ip-modal.component.html',
  styleUrls: ['./ip-modal.component.scss'],
})
export class IPModalComponent
  extends DestroyableComponent
  implements AfterViewInit {
  @ViewChild('ipModal') ipModal?: ElementRef;

  @Select(PhilipsState.getState(['bridgeIP']))
  bridgeIP$?: Observable<string>;

  @Input()
  translatePath?: string;

  inputIP?: string;
  errorPath?: string;

  constructor(
    private readonly modalService: NgbModal,
    private readonly store: Store,
    private readonly actions$: Actions
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.bridgeIP$
      ?.pipe(
        takeUntil(this.destroy$),
        tap((bridgeIP) => {
          if (!bridgeIP) this.openModal();
          else this.closeModal();
        })
      )
      .subscribe();
    this.actions$
      .pipe(
        ofActionDispatched(PhilipsActions.APIError),
        takeUntil(this.destroy$),
        tap(({ error }: PhilipsActions.APIError) => {
          if (this.modalService.hasOpenModals()) {
            if (error && error[0]?.error?.type === 101) {
              this.errorPath = '.pressRequiredError';
            } else {
              this.errorPath = '.commonError';
            }
          } else this.openModal();
        })
      )
      .subscribe();
  }

  connect() {
    if (this.inputIP)
      this.store.dispatch(new PhilipsActions.SetBridgeIP(this.inputIP));
  }

  openModal(): void {
    this.modalService.open(this.ipModal, { centered: true });
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
