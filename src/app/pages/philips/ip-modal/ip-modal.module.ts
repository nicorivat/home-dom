import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { IPModalComponent } from './ip-modal.component';

@NgModule({
  declarations: [IPModalComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    NgbModule,
    TranslateModule,
  ],
  exports: [IPModalComponent],
})
export class IPModalModule {}
