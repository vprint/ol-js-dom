import './style.css';
import { Map, View } from 'ol';
import LeftSidebar from './widget/LeftSidebar';
import LayersAndStyle from './MapElement/LayersAndStyle'
import { Params } from './miscellaneous/enum'
import { fromLonLat } from 'ol/proj'

class MainMap {
  constructor() {
    this.map = new Map({
      target: 'map',
      view: new View({
        center: fromLonLat(Params.MAP.CENTER),
        zoom: Params.MAP.ZOOM
      })
    });

    new LayersAndStyle({
      map: this.map
    });
    new LeftSidebar({
      target: this.map
    });
  }
}

new MainMap();

export default MainMap;