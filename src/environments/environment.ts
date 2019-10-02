// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost/",
  geoserverurl: "http://localhost:8080/",
  defaultZoom: 6,
  center: [80, 13],
  overlayLayers: {
    "POI":{
      layerURL: 'http://localhost:8080/geoserver/tamil_nadu_ws/wms',
      layername: 'tamil_nadu_poi',
      layerType: 'wms',
      tiled: true,
      overlay: true,
      zIndex: 9,
      active: false,
      displayName: "POI"
    },
    "Highway":{
      layerURL: 'http://localhost:8080/geoserver/tamil_nadu_ws/wms',
      layername: 'tamil_nadu_highway',
      layerType: 'wms',
      tiled: true,
      overlay: true,
      zIndex: 10,
      active: true,
      displayName: "Highway"
    }
  },
  baseMap: {
    "OSM": {
      layerURL: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      layername: "OSM",
      tiled: true,
      overlay: false,
      zIndex: 1
      
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
