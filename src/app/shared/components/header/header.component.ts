import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  faChevronLeft,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { takeUntil, tap } from 'rxjs/operators';
import { DestroyableComponent } from '../../abstracts';

@Component({
  selector: 'hd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends DestroyableComponent implements OnInit {
  translatePath = 'header.';
  currentRoute!: string;
  backIcon: IconDefinition = faChevronLeft;

  private urlWithoutParams?: string[];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        tap((route) => {
          if (route instanceof NavigationEnd) {
            const urlTree = this.router.parseUrl(route.urlAfterRedirects);
            this.urlWithoutParams = urlTree.root.children[
              'primary'
            ]?.segments.map((it) => it.path);
            this.currentRoute = this.urlWithoutParams[0];
          }
        })
      )
      .subscribe();
  }

  backHome(): void {
    if (this.urlWithoutParams && this.urlWithoutParams?.length > 1)
      this.router.navigate(
        [
          this.urlWithoutParams
            .slice(0, this.urlWithoutParams.length - 1)
            .join('/'),
        ],
        { relativeTo: this.activatedRoute }
      );
    else this.router.navigate(['/home']);
  }
}
