import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DestroyableComponent implements OnDestroy {
  protected readonly destroy$: Subject<unknown> = new Subject();

  OnDestroy() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.OnDestroy();
  }
}
