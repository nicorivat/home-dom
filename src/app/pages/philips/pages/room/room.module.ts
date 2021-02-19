import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SwitcherModule } from '../../../../shared';
import { RoomPageComponent } from './room.page';

@NgModule({
  declarations: [RoomPageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SwitcherModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: RoomPageComponent }]),
  ],
  exports: [RoomPageComponent],
})
export class RoomPageModule {}
