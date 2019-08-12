import { Component, OnInit } from '@angular/core';
import { faSearchPlus, faSearchMinus, faCompress } from '@fortawesome/free-solid-svg-icons';
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
  fullscreenIcon = faCompress;
  map: any;
  constructor(private MapComponent) { 
    this.map = MapComponent.map;
  }

  ngOnInit() {
  }
  // Default zoom event

  // zoomin event
  zoominEvent(value){
    console.log(this.map);
    console.log(value.source.checked);
    // alert(value);
  }

  zoomoutEvent(value){
    // console.log(value)
    alert(value.source.checked);
  }

  fullScreen(value){
    // console.log(value)
    alert(value.source.checked);
  }
}
