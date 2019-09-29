import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import TileWMS from 'ol/source/TileWMS.js';
import TileLayer from 'ol/layer/Tile.js';
import { MapService } from 'src/app/service/map.service';
@Component({
  selector: 'app-layer-panel',
  templateUrl: './layer-panel.component.html',
  styleUrls: ['./layer-panel.component.css']
})
export class LayerPanelComponent implements OnInit {

  constructor(private mapService: MapService){ }
  overlayList: any[];
  ngOnInit() {
    // Wms 
    let overlayList = [];
    for (let [key, layer] of Object.entries(environment.layers)){
      // console.log(key, layer);
      if(layer.overlay){
        overlayList.push(
          // tile layer
          new TileLayer({
            // WMS source
            source: new TileWMS({
              url: layer.layerURL,
              params: {
                LAYERS: layer.layername,
                TILED: layer.tiled,
                overlay: layer.overlay
              }
            })
          })
        );
      }
    }
    this.overlayList = overlayList;
    this.overlayList.forEach((layer)=> {
      this.mapService.getMap(this.mapService.getId()).addLayer(layer);
    });
  }

}
