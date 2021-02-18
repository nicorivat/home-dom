import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SwitcherComponent } from './switcher.component';

@NgModule({
  declarations: [SwitcherComponent],
  imports: [CommonModule, FlexLayoutModule, FontAwesomeModule, UiSwitchModule],
  exports: [SwitcherComponent],
})
export class SwitcherModule {}
