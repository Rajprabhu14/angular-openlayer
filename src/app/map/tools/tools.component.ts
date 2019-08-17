import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { faSearchPlus, faSearchMinus, faPencilRuler, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { MapComponent } from '../component/map.component';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  
  animations: [
    trigger(
      'toggleState', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    // trigger('toggleState', [
    //   transition('* => *', animate('1000ms'))
    // ])
  ]
})
export class ToolsComponent implements OnInit {
  // icon selection
  zoominIcon = faSearchPlus;
  zoomoutIcon = faSearchMinus;
  drawIcon = faPencilRuler;
  closeIcon = faTimes;
  gfiIcon = faInfo;
  map: any;
  measure = false;
  selectedTool:string;
  constructor(@Inject(forwardRef(() => MapComponent)) private parentMap: MapComponent) {}
  shouldToggle = false;
  ngOnInit() {
    this.map = this.parentMap.map;
  }
  // Default zoom event

  // zoomin event
  zoominEvent(){
    this.map.getView().animate({zoom: this.map.getView().getZoom() + 1 });
    this.selectedTool = '';
  }

  zoomoutEvent(){
    this.map.getView().animate({zoom: this.map.getView().getZoom() -  1 });
    this.selectedTool = '';
  }

  openPanelTool(value){
    this.shouldToggle = !this.shouldToggle;
  }
  
  // close tool
  closeTool() {
    this.shouldToggle = !this.shouldToggle;
    this.selectedTool = '';
  }
}
