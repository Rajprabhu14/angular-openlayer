import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './component/map.component';
import { MapRoutingModule } from './map-routing.module';
import { ToolsComponent } from './tools/tools.component';
import { DemoMaterialModule } from '../material-module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MeasureToolComponent } from './tools/measure-tool/measure-tool.component';
import { GfiToolComponent } from './tools/gfi-tool/gfi-tool.component';
import { LayerPanelComponent } from './layer-panel/layer-panel.component';
@NgModule({
  declarations: [MapComponent, ToolsComponent, MeasureToolComponent, GfiToolComponent, LayerPanelComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    DemoMaterialModule,
    FontAwesomeModule
  ],
  providers:[MapComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
]
})
export class MapModule { }
