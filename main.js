import './style.css';
import 'ol-ext/dist/ol-ext.min.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { SidePanel } from 'ol-side-panel';
import EditBar from './widget/Edition/EditBar';

//import Button from 'ol-ext/control/Button'

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

// Sidepanel
const sidePanel = new SidePanel();
map.addControl(sidePanel);


const layersPane = sidePanel.definePane({
  paneId: 'layers',
  name: "Layers",
  icon: 'Y'
});

new EditBar({
  target: document.getElementById(sidePanel.getPaneById('layers').element_.id),
  map: map
});

document.getElementById('')