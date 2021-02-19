import {
  AfterViewInit, Component,
  ElementRef,

  ViewChild
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ModalAbstract } from '../../../abstracts';
import { ConfigsActions, ConfigsState } from '../../../store';

@Component({
  selector: 'hd-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.scss'],
})
export class ConfigModalComponent
  extends ModalAbstract
  implements AfterViewInit {
  @ViewChild('configModal')
  protected modal?: ElementRef;

  @Select(ConfigsState.getState(['language']))
  language$!: Observable<string>;

  translatePath: string = 'config.';
  langs: string[] = ['gb', 'fr'];
  iconUrl: string = 'https://www.countryflags.io';

  constructor(
    protected readonly modalService: NgbModal,
    private readonly store: Store,
    private readonly actions$: Actions
  ) {
    super(modalService);
  }

  ngAfterViewInit(): void {
    this.actions$
      .pipe(
        ofActionDispatched(ConfigsActions.ShowConfigModal),
        takeUntil(this.destroy$),
        tap(() => this.openModal())
      )
      .subscribe();
  }

  changeLang(language: string): void {
    this.store.dispatch(new ConfigsActions.SetLanguage(language));
  }
}
