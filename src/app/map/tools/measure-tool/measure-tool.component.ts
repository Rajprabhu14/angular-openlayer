import { Component, OnInit, Inject, forwardRef, OnDestroy } from '@angular/core';
import { MapComponent } from '../../component/map.component';
import Draw from 'ol/interaction/Draw';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {unByKey} from 'ol/Observable.js';
import Overlay from 'ol/Overlay.js';
import {getArea, getLength} from 'ol/sphere.js';
import {LineString, Polygon} from 'ol/geom.js';
@Component({
  selector: 'app-measure-tool',
  templateUrl: './measure-tool.component.html',
  styleUrls: ['./measure-tool.component.css']
})
export class MeasureToolComponent implements OnInit, OnDestroy {
  map: any;
  source: VectorSource = new VectorSource({wrapX: false});
  helpTooltipElement: any;
  helpTooltip: any;
  sketch: any;
  measureTooltipElement: any;
  measureTooltip: any;
  selectedLengthUnit: string;
  selectedAreaUnit: string;
  // Message to show when the user is drawing a polygon.
  continuePolygonMsg = 'Click to continue drawing the polygon';
 // Message to show when the user is drawing a line
  continueLineMsg = 'Click to continue drawing the line';
  selectedDrawOption: string;
  // measure units
  lengthUnits = ['km', 'm'];
  areaUnits = ['km', 'm'];
  vector: VectorLayer = new VectorLayer({
    source: this.source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33'
        })
      })
    })
  });

  draw: Draw;
  constructor(@Inject(forwardRef(() => MapComponent)) private parentMap: MapComponent) {}

  ngOnInit() {
    this.selectedAreaUnit = 'km';
    this.selectedLengthUnit = 'km';
    this.map = this.parentMap.map;
    this.map.addLayer(this.vector);
    this.draw = new Draw({
      source: this.source,

    });
    this.createMeasureTooltip();
    this.createHelpTooltip();
    this.map.on('pointermove', this.pointerMoveHandler.bind(this));

    this.map.getViewport().addEventListener('mouseout', function() {
      this.helpTooltipElement.classList.add('hidden');
    }.bind(this));
  }

  ngOnDestroy() {
    this.map.removeLayer(this.vector);
    this.map.removeInteraction(this.draw);
    this.map.removeOverlay(this.helpTooltip);
    const elements = document.getElementsByClassName('tooltip-static');
    while (elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    this.map.removeOverlay(this.measureTooltip);
  }
  activateDraw(value) {
    this.map.removeInteraction(this.draw);
    this.addInteraction(value);
    // alert(value);
  }

  addInteraction(value) {
    this.selectedDrawOption = value;
    if (value !== 'None') {
    this.draw = new Draw({
      source: this.source,
      type: value,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)'
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          })
        })
      })
    });
    this.map.addInteraction(this.draw);
    let listener: any;
    this.draw.on('drawstart',(evt) => {
      let _this = this;
            // set this.sketch
      this.sketch = evt.feature;

      /** @type {module:ol/coordinate~Coordinate|undefined} */
      var tooltipCoord = evt.coordinate;

      listener = this.sketch.getGeometry().on('change', function(evt) {
        var geom = evt.target;
        var output;
        if (geom instanceof Polygon) {
          output = _this.formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
          output = _this.formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        _this.measureTooltipElement.innerHTML = output;
        _this.measureTooltip.setPosition(tooltipCoord);
      });
    }, this);

    this.draw.on('drawend', () => {
        this.measureTooltipElement.className = 'tooltip tooltip-static';
        this.measureTooltip.setOffset([0, -7]);
        // unset this.sketch
        this.sketch = null;
        // unset tooltip so that a new one can be created
        this.measureTooltipElement = null;
        this.createMeasureTooltip();
        unByKey(listener);
      }, this);
    }
  }

  // point move handler on map
  pointerMoveHandler(evt) {
    if (evt.dragging) {
      return;
    }
    let helpMsg = 'Click to start drawing';

    if (this.sketch) {
      let geom = (this.sketch.getGeometry());
      if (geom instanceof Polygon) {
        helpMsg = this.continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = this.continueLineMsg;
      }
    }

    this.helpTooltipElement.innerHTML = helpMsg;
    this.helpTooltip.setPosition(evt.coordinate);

    this.helpTooltipElement.classList.remove('hidden');
  }

  // format area
  formatArea(polygon) {
    let area = getArea(polygon);
    let output;
    switch (this.selectedAreaUnit) {
      case 'm':
          output = (Math.round(area * 100) / 100) +
          ' ' + 'm<sup>2</sup>';
          break;
      case 'km':
          output = (Math.round(area / 1000000 * 100) / 100) +
          ' ' + 'km<sup>2</sup>';
          break;
    }
    return output;
  }

  // format length
  formatLength(line) {
    let length = getLength(line);
    let output;
    switch (this.selectedLengthUnit) {
      case 'm':
          output = (Math.round(length * 100) / 100) +
          ' ' + 'm';
          break;
      case 'km':
          output = (Math.round(length / 1000 * 100) / 100) +
          ' ' + 'km';
          break;
    }
    return output;
  }


  /**
   * Creates a new measure tooltip
   */
  createMeasureTooltip() {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    }
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'tooltip tooltip-measure';
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    this.map.addOverlay(this.measureTooltip);
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
