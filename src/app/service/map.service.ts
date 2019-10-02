import { Injectable } from '@angular/core';
import OlMap from 'ol/Map.js';
import OlView from 'ol/View';
import {defaults as defaultInteractions} from 'ol/interaction.js';
import {fromLonLat} from 'ol/proj.js';
import {defaults as defaultControls}  from 'ol/control';
 import { environment as env } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }
  private id: string;
  private map = {};
  parameterForGFIDisplay = {
    'ne':{
        'layerName': 'Countries',
        'value':{
            'Name': 'abbrev',
            'Economy Rank': 'economy',
            'Last Census taken': 'lastcensus',
            'Population': 'pop_est'
        }
    },
    'tamil_nadu_highway':{
      'layerName': 'Roads',
      'value':{
          'Name': 'Name',
          'TYPE': 'Type',
          'ONEWAY': 'Oneway',
          'LANES': 'Lanes'
      }
  },
  'tamil_nadu_poi':{
      'layerName': 'Places',
      'value':{
          'Name': 'Name',
          'PLACE': 'Place',
          'ADDR:FLATS': 'Flat No',
          'ADDR:HOUSE': 'house No',
          'ADDR:CITY': 'City',
          'ADDR:POSTC': 'Post code',
      }
  }
  };
  
  getGFIParamsConfig (layerName){
      return this.parameterForGFIDisplay[layerName];
  }
  /***
   * params id map id
   * @return [ol.Map]
   */

  private CreateMap(id): OlMap {
    const map = new OlMap({
    // Improve user experience by loading tiles while animating. Will make
    // animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: true,
      interactions: defaultInteractions({
        constrainResolution: false, onFocusOnly: false
      }),
      target: id,
      view: new OlView({
        center:  fromLonLat(env.center),
        zoom: env.defaultZoom
      }),
      zoomOptions: false,
        controls: defaultControls({
          zoom:false,
          attribution:false
      })
    });
    return map;
  }

  /**
   * Get a map. If it doesn't exist it will be created.
   * @param id id of the map or an objet with a getId method (from mapid service), default 'map'
  */
  getMap(id): OlMap{
    id = ((id ? id:  'map')) || 'map';
    if(!this.map[id]){
      this.map[id] = this.CreateMap(id);
    }
    return this.map[id];
  }
  setId(id){
    this.id = id;
  }

  getId(){
    return this.id;
  }
}
