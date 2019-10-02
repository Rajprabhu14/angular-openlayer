import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Map from 'ol/Map.js';
import {fromLonLat} from 'ol/proj.js';
import "ol/ol.css";
import {faListAlt } from '@fortawesome/free-solid-svg-icons';
import { MapService } from 'src/app/service/map.service';
import { environment as env } from 'src/environments/environment';
import { LayerPanelComponent } from './../layer-panel/layer-panel.component';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', ]
})
export class MapComponent implements OnInit {
  map: Map;
  internalMapId: string;
  listIcon = faListAlt;

  @ViewChild('layerPanel') layerPanel: LayerPanelComponent
   /** Map id */
   @Input() id: string;
  // if values are not provided value will be taken from environment
  /** Longitude of the map
   */
  @Input() lon: string;

  /** Latitude of the map
   */
  @Input() lat: string;

  /** Zoom of the map
   */
  @Input() zoom: string;


  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.initializeMap();
  }
  initializeMap() {
    this.map = this.mapService.getMap(this.id);
    if(!this.id){
      this.id = 'map';
    }
    this.mapService.setId(this.id);
    
    // centering on attributes
    this.map.getView().setCenter(fromLonLat([parseFloat(this.lon) || env.center[0], 
    parseFloat(this.lat) || env.center[1]]));
    this.map.getView().setZoom(parseFloat(this.zoom) || env.defaultZoom);
  }

  openPanel(e){
    this.layerPanel.openLayerPanel();
  }

}
