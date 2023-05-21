import './style.css';
import { Map, View } from 'ol';
import LeftSidebar from './widget/LeftSidebar';
import LayersAndStyle from './MapElement/LayersAndStyle'
import { MAP_SETTINGS } from './Miscellaneous/enum'
import { fromLonLat } from 'ol/proj'
import Attribution from 'ol/control/Attribution.js';
import ApiRequestor from './Services/ApiRequestor';

class MainMap {
  constructor() {
    //if (serverStatus) {
      this.map = new Map({
        target: 'map',
        controls: [new Attribution({collapsible: true})],
        view: new View({
          center: fromLonLat(MAP_SETTINGS.CENTER),
          zoom: MAP_SETTINGS.ZOOM
        })
      });
  
      new LayersAndStyle({
        map: this.map
      });
  
      new LeftSidebar({
        target: this.map
      });
    //} 
    //else {
      //document.getElementById('map').appendChild(document.createTextNode("Le serveur de donnée est indisponible, impossible d'afficher la page"))
    //}
  }
}

let serverStatus = await ApiRequestor.getFeatureServerStatus()

new MainMap();

export default MainMap;