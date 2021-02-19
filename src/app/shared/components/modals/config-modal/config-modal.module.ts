import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigModalComponent } from './config-modal.component';

@NgModule({
  declarations: [ConfigModalComponent],
  imports: [CommonModule, FlexLayoutModule, TranslateModule, NgbModule],
  exports: [ConfigModalComponent],
})
export class ConfigsModalModule {}
