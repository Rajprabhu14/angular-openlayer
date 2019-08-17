import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';

import TileWMS from 'ol/source/TileWMS.js';
import {defaults as defaultInteractions} from 'ol/interaction.js';
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
    // wms source creation
    var wmsSource = new TileWMS({
      url: 'https://ahocevar.com/geoserver/ne/wms',
      params: {'LAYERS': 'ne', 'TILED': true, overlay:true},
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });
    // Wms Layer creation
    var wmsLayer = new TileLayer({
      source: wmsSource,
      overlay: true
    });

    // map object
    this.map = new Map({
      target: 'map',
      interactions: defaultInteractions({
          constrainResolution: false, onFocusOnly: false
        }),
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM(),
          overlay: false
        }),
        wmsLayer
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
