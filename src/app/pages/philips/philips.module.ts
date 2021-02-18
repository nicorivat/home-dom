import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { PhilipsService, PhilipsState } from './../../shared';
import { IPModalModule } from './ip-modal';
import { PhilipsPageComponent } from './philips.page';
import { RoomsModule } from './rooms';

@NgModule({
  declarations: [PhilipsPageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IPModalModule,
    RoomsModule,
    NgxsModule.forFeature([PhilipsState]),
    RouterModule.forChild([{ path: '', component: PhilipsPageComponent }]),
  ],
  providers: [PhilipsService],
  exports: [PhilipsPageComponent],
})
export class PhilipsPageModule {}
