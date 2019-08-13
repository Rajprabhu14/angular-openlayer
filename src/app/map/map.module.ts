import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './component/map.component';
import { MapRoutingModule } from './map-routing.module';
import { ToolsComponent } from './tools/tools.component';
import { DemoMaterialModule } from '../material-module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MeasureToolComponent } from './tools/measure-tool/measure-tool.component';
@NgModule({
  declarations: [MapComponent, ToolsComponent, MeasureToolComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    DemoMaterialModule,
    FontAwesomeModule
  ],
  providers:[MapComponent]
})
export class MapModule { }
