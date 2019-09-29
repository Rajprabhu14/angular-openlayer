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
            },
        },
        'tamil_nadu_highway':{
            'layerName': 'Countries',
            'value':{
                'Name': 'Name',
                'TYPE': 'Type',
                'ONEWAY': 'Oneway',
                'LANES': 'Lanes'
            }
        },
        'tamil_nadu_poi':{
            'layerName': 'Countries',
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
    getConfig (layerName){
        return this.parameterForDisplay[layerName];
    }
}
