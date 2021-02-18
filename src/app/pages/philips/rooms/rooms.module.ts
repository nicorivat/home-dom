import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SwitcherModule } from '../../../shared';
import { RoomsComponent } from './rooms.component';

@NgModule({
  declarations: [RoomsComponent],
  imports: [CommonModule, FlexLayoutModule, TranslateModule, SwitcherModule],
  exports: [RoomsComponent],
})
export class RoomsModule {}
