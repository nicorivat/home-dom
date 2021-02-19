import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import {
  ConfigsActions,
  ConfigsState,
  ModalAbstract,
  SpotifyService
} from '../../../shared';

@Component({
  selector: 'hd-spotify-clientId-modal',
  templateUrl: './clientId-modal.component.html',
  styleUrls: ['./clientId-modal.component.scss'],
})
export class SpotifyClientIdModalComponent
  extends ModalAbstract
  implements OnInit, AfterViewInit {
  @ViewChild('clientIdModal')
  protected modal?: ElementRef;

  @Select(ConfigsState.getState(['spotify', 'tmpClientId']))
  tmpClientId$!: Observable<string>;

  @Input()
  translatePath!: string;

  inputClientId?: string;
  isInError: boolean = false;

  constructor(
    protected readonly modalService: NgbModal,
    private readonly spotifyService: SpotifyService,
    private readonly store: Store,
    private readonly router: Router
  ) {
    super(modalService);
  }

  ngOnInit(): void {
    this.tmpClientId$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap((tmpClientId) => (this.inputClientId = tmpClientId))
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.openModal();
  }

  connect(): void {
    if (this.inputClientId) {
      this.store.dispatch(
        new ConfigsActions.SetSpotifyConfig({ tmpClientId: this.inputClientId })
      );
      this.spotifyService.getAuthorization(this.inputClientId);
    }
  }

  cancel(): void {
    this.closeModal();
    this.router.navigate(['/home']);
  }

  OnDestroy(): void {
    this.closeModal();
  }
}
