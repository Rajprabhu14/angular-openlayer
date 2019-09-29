import { Component, OnInit, ElementRef, Input } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';

import TileWMS from 'ol/source/TileWMS.js';
import {defaults as defaultInteractions} from 'ol/interaction.js';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';
import "ol/ol.css";
import {defaults as defaultControls}  from 'ol/control';
import {faListAlt } from '@fortawesome/free-solid-svg-icons';
import {MatButtonModule} from '@angular/material/button';
import { MapService } from 'src/app/service/map.service';
import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', ]
})
export class MapComponent implements OnInit {
  map: Map;
  internalMapId: string;
  listIcon = faListAlt;
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


  constructor(private mapService: MapService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.initializeMap();
  }
  initializeMap() {
    this.map = this.mapService.getMap(this.id);
    if(!this.id){
      this.id = 'map';
      this.map.setTarget(this.elementRef.nativeElement);
    }
    this.mapService.setId(this.id);
    
    // centering on attributes
    this.map.getView().setCenter(fromLonLat([parseFloat(this.lon) || env.center[0], 
    parseFloat(this.lat) || env.center[1]]));
    this.map.getView().setZoom(parseFloat(this.zoom) || env.defaultZoom);
  }

}
