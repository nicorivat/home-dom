import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home.page';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, FlexLayoutModule, HomeRoutingModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
