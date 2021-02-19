import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
  ModalAbstract,
  PhilipsActions,
  PhilipsState
} from '../../../../shared';

@Component({
  selector: 'hd-ip-modal',
  templateUrl: './ip-modal.component.html',
  styleUrls: ['./ip-modal.component.scss'],
})
export class IPModalComponent extends ModalAbstract implements AfterViewInit {
  @ViewChild('ipModal')
  protected modal?: ElementRef;

  @Select(PhilipsState.getState(['bridgeIP']))
  bridgeIP$?: Observable<string>;

  @Input()
  translatePath?: string;

  inputIP?: string;
  errorPath?: string;

  constructor(
    protected readonly modalService: NgbModal,
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly router: Router
  ) {
    super(modalService);
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

  connect(): void {
    if (this.inputIP)
      this.store.dispatch(new PhilipsActions.SetBridgeIP(this.inputIP));
  }

  cancel() {
    this.closeModal();
    this.router.navigate(['/home']);
  }
}
