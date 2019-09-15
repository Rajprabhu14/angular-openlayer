import { Component, OnInit, Inject, forwardRef, OnDestroy, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { MapComponent } from '../../component/map.component';
import { HttpRequestService } from '../../../service/http-request.service';
import Overlay from 'ol/Overlay.js';
import { MapService } from 'src/app/service/map.service';
import {NestedTreeControl, FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

@Component({
  selector: 'app-gfi-tool',
  templateUrl: './gfi-tool.component.html',
  styleUrls: ['./gfi-tool.component.css']
})
export class GfiToolComponent implements OnInit, OnDestroy {
  message = 'Select Feature on map';
  map: any;
  avaiableLayers: any[];
  helpTooltipElement: any;
  helpTooltip: any;
  this_ = this;
  gfiTree: any[];
  displayTree = false;
  columnsToDisplay = ['params', 'value'];
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  @ViewChildren('dataForLayer') dataForLayer: QueryList<ElementRef>;
  @ViewChildren('treeOpen') treeOpen: QueryList<ElementRef>;
  constructor(@Inject(forwardRef(() => MapComponent)) private parentMap: MapComponent,
              private httpRequest: HttpRequestService,
              private mapService: MapService) {
    this.map = this.parentMap.map;
   
   }
   // mat tree start
  //  private _transformer = (node, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level,
  //   };
  // }

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer, node => node.level, node => node.expandable, node => node.children);

  // treeControl = new FlatTreeControl<any>(
  //   node => node.level, node => node.expandable);

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // // dataSource = new MatTreeNestedDataSource<any>();
  // hasChild = (_: number, node) => node.expandable;
  
  // tree end

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
            let tableObjArr = [];
            for (let key in layerKeyPair) {
              tableObjArr.push({
                "params": key,
               "value": feature["properties"][layerKeyPair[key]]
              });
              // layerKeyPair[key] = feature["properties"][layerKeyPair[key]];
            }
            
            let child = {
              "name": feature.id.split('.').slice(-1)[0],
              table:tableObjArr
            };
            obj["children"].push(child);
          });
          this.gfiTree.push(obj);
          console.log(this.gfiTree);
          // this.dataSource.data = this.gfiTree;
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

  openGFITree(i, layerName:string, event) {
    event.srcElement.classList.toggle("caret-down");
    let currentChild =  this.dataForLayer.filter((ele, idx) => idx == i)[0];
    currentChild.nativeElement.classList.toggle('active');
    console.log(this.gfiTree[i].children[i]);
  }

  openTree(j, layerName:string, event){
    event.srcElement.classList.toggle("caret-down");
    let currentChild =  this.treeOpen.filter((ele, idx) => idx == j)[0];
    currentChild.nativeElement.classList.toggle('active');
  }
}