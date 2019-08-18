import { Component, OnInit, Inject, forwardRef, OnDestroy } from '@angular/core';
import { MapComponent } from '../../component/map.component';
import { HttpRequestService } from '../../../service/http-request.service';
import Overlay from 'ol/Overlay.js';
import { MapService } from 'src/app/service/map.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

@Component({
  selector: 'app-gfi-tool',
  templateUrl: './gfi-tool.component.html',
  styleUrls: ['./gfi-tool.component.css']
})
export class GfiToolComponent implements OnInit, OnDestroy {
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  message = 'Select Feature on map';
  map: any;
  avaiableLayers: any[];
  helpTooltipElement: any;
  helpTooltip: any;
  this_ = this;
  gfiTree: any[];
  displayTree = false;
  
  constructor(@Inject(forwardRef(() => MapComponent)) private parentMap: MapComponent,
              private httpRequest: HttpRequestService,
              private mapService: MapService) {
    this.map = this.parentMap.map;
   
   }
  
  ngOnInit() {
    this.displayTree = false;
    this.avaiableLayers = this.getWMSLayers();
    
    // pointer style change
    this.map.on('pointermove', ((evt) => {
      if (evt.dragging) {
        return;
      }
      var pixel = this.map.getEventPixel(evt.originalEvent);
      var hit = this.map.forEachLayerAtPixel(pixel, function() {
        return true;
      });
      this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';

      let helpMsg = 'Click on map to get info';
  
      this.helpTooltipElement.innerHTML = helpMsg;
      this.helpTooltip.setPosition(evt.coordinate);
  
      this.helpTooltipElement.classList.remove('hidden');
    }).bind(this));

    // registering click event on the map
    this.map.on('singleclick', ((evt) => {
      this.getData(evt);
    }).bind(this));

    // select help tooltip
    this.createHelpTooltip();
  }

  ngOnDestroy() {
    this.map.removeOverlay(this.helpTooltip);
  }

  getWMSLayers() {
    let layersArray = this.map.getLayers().getArray().filter((element, index, array) => {
      return element.getProperties().overlay;
    }); 
    return layersArray;

  }

  // getfeature info data creation
  getData(evt){
    this.gfiTree = [];
   
    var viewResolution = (this.map.getView().getResolution());
    this.avaiableLayers.forEach((lyr) => {
      var url = lyr.getSource().getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': 'application/json'});
        this.httpRequest.getGFIResponse(url, lyr.getSource().getParams()["LAYERS"]).subscribe((response => { 
          console.log(response);
          let obj = {
            "name": response.layerName,
            "children": []
          }
          let layerDetails = this.mapService.getGFIParamsConfig(response.layerName);
          obj["name"] = layerDetails.layerName;
          response.features.forEach((feature) => {
            let layerKeyPair = Object.assign({}, layerDetails.value);
            for (let key in layerKeyPair) {
              layerKeyPair[key] = feature["properties"][layerKeyPair[key]];
            }
            
            let child = {
              "name": feature.id.split('.').slice(-1)[0],
              children: []
            };
            child["children"].push(Object.assign({}, layerKeyPair));
            obj["children"].push(child);
          });
          this.gfiTree.push(obj);
          this.dataSource.data = this.gfiTree;
          this.displayTree = true
        }).bind(this));
    });
  }

  /**
   * Creates a new help tooltip
   */
    
  createHelpTooltip() {
    if (this.helpTooltipElement) {
      this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    }
    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'tooltip hidden';
    this.helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.map.addOverlay(this.helpTooltip);
  }
}
