import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './component/map.component';
import { MapRoutingModule } from './map-routing.module';
@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule
  ]
})
export class MapModule { }
