export class Gfi {
    parameterForDisplay = {
        'ne':{
            'Name': 'abbrev',
            'Economy Rank': 'economy',
            'Last Census taken': 'lastcensus',
            'Population': 'pop_est'
        }
    };
    getConfig (layerName){
        return this.parameterForDisplay[layerName];
    }
}
