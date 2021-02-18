import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxsModule } from '@ngxs/store';
import { PhilipsService, PhilipsState } from './../../shared';
import { IPModalModule, RoomsModule } from './components';
import { PhilipsRoutingModule } from './philips-routing.module';
import { PhilipsPageComponent } from './philips.page';

@NgModule({
  declarations: [PhilipsPageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IPModalModule,
    RoomsModule,
    PhilipsRoutingModule,
    NgxsModule.forFeature([PhilipsState]),
  ],
  providers: [PhilipsService],
  exports: [PhilipsPageComponent],
})
export class PhilipsPageModule {}
