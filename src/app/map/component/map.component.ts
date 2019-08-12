import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';
import "ol/ol.css";
import {defaults as defaultControls}  from 'ol/control';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', ]
})
export class MapComponent implements OnInit {
  map: Map;
  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }
  initializeMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM()
        })
      ],
      // Improve user experience by loading tiles while animating. Will make
      // animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: true,
      view: new View({
        center:  fromLonLat([80, 13]),
        zoom: 6
      }),
      zoomOptions: false,
      controls: defaultControls({
        zoom:false,
        attribution:false
      })
    });
    // import {defaults as defaultControls, FullScreen}  from 'ol/control';
    // controls: defaultControls().extend([
    //   new FullScreen()
    // ]),
  }

}
