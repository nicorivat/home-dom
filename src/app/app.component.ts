import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  private timeoutInterval!: NodeJS.Timeout;

  constructor(
    private readonly translateService: TranslateService,
    private readonly router: Router
  ) {
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

  resetTimeout() {
    if (this.timeoutInterval) clearInterval(this.timeoutInterval);
    // Redirect home after 5 minutes if no user input
    this.timeoutInterval = setInterval(() => {
      if (!this.router.url.includes('home')) this.router.navigate(['/home']);
    }, 300000);
  }
}
