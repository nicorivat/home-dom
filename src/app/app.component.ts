import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ConfigsState, DestroyableComponent } from './shared';

@Component({
  selector: 'hd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends DestroyableComponent implements OnInit {
  @Select(ConfigsState.getState(['language']))
  language$!: Observable<string>;

  constructor(private readonly translateService: TranslateService) {
    super();
  }

  ngOnInit(): void {
    this.language$
      .pipe(
        takeUntil(this.destroy$),
        tap((language) => this.translateService.use(language))
      )
      .subscribe();
  }
}
