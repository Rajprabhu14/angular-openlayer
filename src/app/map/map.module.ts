import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './component/map.component';
import { MapRoutingModule } from './map-routing.module';
import { ToolsComponent } from './tools/tools.component';
import { DemoMaterialModule } from '../material-module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [MapComponent, ToolsComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    DemoMaterialModule, 
    FontAwesomeModule
  ],
  providers:[MapComponent]
})
export class MapModule { }
