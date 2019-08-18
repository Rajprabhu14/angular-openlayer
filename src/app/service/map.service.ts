import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  parameterForGFIDisplay = {
    'ne':{
        'layerName': 'Countries',
        'value':{
            'Name': 'abbrev',
            'Economy Rank': 'economy',
            'Last Census taken': 'lastcensus',
            'Population': 'pop_est'
        }
    }
  };
  
  getGFIParamsConfig (layerName){
      return this.parameterForGFIDisplay[layerName];
  }
}
