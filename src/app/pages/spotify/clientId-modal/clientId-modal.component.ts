import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import {
  ConfigsActions,
  ConfigsState,
  DestroyableComponent,
  SpotifyService
} from '../../../shared';

@Component({
  selector: 'hd-spotify-clientId-modal',
  templateUrl: './clientId-modal.component.html',
  styleUrls: ['./clientId-modal.component.scss'],
})
export class SpotifyClientIdModalComponent
  extends DestroyableComponent
  implements OnInit, AfterViewInit {
  @ViewChild('clientIdModal') clientIdModal?: ElementRef;

  @Select(ConfigsState.getState(['spotify', 'tmpClientId']))
  tmpClientId$!: Observable<string>;

  @Input()
  translatePath!: string;

  inputClientId?: string;
  isInError: boolean = false;

  constructor(
    private readonly modalService: NgbModal,
    private readonly spotifyService: SpotifyService,
    private readonly store: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.tmpClientId$.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      tap((tmpClientId) => (this.inputClientId = tmpClientId))
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.modalService.open(this.clientIdModal, { centered: true });
  }

  connect(): void {
    if (this.inputClientId) {
      this.store.dispatch(
        new ConfigsActions.SetSpotifyConfig({ tmpClientId: this.inputClientId })
      );
      this.spotifyService.getAuthorization(this.inputClientId);
    }
  }

  OnDestroy(): void {
    this.modalService.dismissAll();
  }
}
