import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SpotifyClientIdModalComponent } from './clientId-modal.component';

@NgModule({
  declarations: [SpotifyClientIdModalComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    NgbModule,
    FormsModule,
  ],
  exports: [SpotifyClientIdModalComponent],
})
export class SpotifyClientIdModalModule {}
