import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { faSearchPlus, faSearchMinus, faPencilRuler, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MappingsContext } from 'source-list-map';
import { MapComponent } from '../component/map.component';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  zoominIcon = faSearchPlus;
  zoomoutIcon = faSearchMinus;
  drawIcon = faPencilRuler;
  closeIcon = faTimes;
  map: any;
  selectedTool:string;
  constructor(@Inject(forwardRef(() => MapComponent)) private parentMap: MapComponent) {}

  ngOnInit() {
    this.map = this.parentMap.map;
  }
  // Default zoom event

  // zoomin event
  zoominEvent(){
    this.map.getView().animate({zoom: this.map.getView().getZoom() + 1 });
  }

  zoomoutEvent(){
    this.map.getView().animate({zoom: this.map.getView().getZoom() -  1 });
  }

  drawTool(value){
  }
}
