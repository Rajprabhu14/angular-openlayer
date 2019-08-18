import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Gfi {
    parameterForDisplay = {
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
    getConfig (layerName){
        return this.parameterForDisplay[layerName];
    }
}
