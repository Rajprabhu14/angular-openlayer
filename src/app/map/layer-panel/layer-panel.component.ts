import { Component, OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';
import TileWMS from 'ol/source/TileWMS.js';
import TileLayer from 'ol/layer/Tile.js';
import { MapService } from 'src/app/service/map.service';
// import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import { trigger, transition, style, animate } from '@angular/animations';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-layer-panel',
  templateUrl: './layer-panel.component.html',
  styleUrls: ['./layer-panel.component.css'],
  animations: [
    trigger(
      'toggleLayerPanel', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translate(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class LayerPanelComponent implements OnInit {
  closeIcon = faTimes;
  constructor(private mapService: MapService){ }
  overlayList: any[];
  map: any;
  shouldToggle = false;
  ngOnInit() {
    // Wms 
    this.map = this.mapService.getMap(this.mapService.getId())
    let overlayList = [];
    for (let [key, layer] of Object.entries(environment.overlayLayers)){
      // console.log(key, layer);
      if(layer.overlay){
        overlayList.push(
          // tile layer
          new TileLayer({
            // WMS source
            zIndex: layer.zIndex,
            active: layer.active,
            displayName: layer.displayName,
            source: new TileWMS({
              url: layer.layerURL,
              params: {
                LAYERS: layer.layername,
                TILED: layer.tiled,
                overlay: layer.overlay
              }
            }),
            overlay: layer.overlay
          })
        );
      }

    //   else {
    //     overlayList.push(
    //       // tile layer
    //       new TileLayer({
    //         // base source
    //         zIndex: layer.zIndex,
    //         preload: Infinity,
    //         source: new OSM(),
    //         overlay: layer.overlay
    //         // source: new XYZ({
    //         //   url: layer.layerURL,
    //         //   params: {
    //         //     LAYERS: layer.layername,
    //         //     TILED: layer.tiled,
    //         //   }
    //         // })
    //     })
    //   );
    // }
    }
    this.overlayList = overlayList;
    this.overlayList.forEach((layer)=> {
      if(layer.getProperties().active){
        this.map.addLayer(layer);
      }
    });
  }

  openLayerPanel() {
    this.shouldToggle = !this.shouldToggle;
    console.log(this.shouldToggle)
  }

  layerControl(selectedLayer, event) {
    // selectedLayer.getProperties().active
   if(selectedLayer.get('active')){
     this.map.removeLayer(selectedLayer);
     selectedLayer.set('active', false)
   }else{
    selectedLayer.set('active', true)
    this.map.addLayer(selectedLayer);
   }
  }

}
