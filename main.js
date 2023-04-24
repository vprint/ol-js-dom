import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { SidePanel } from 'ol-side-panel';
import EditBar from './widget/EditBar'

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

console.log(map.getView())
new EditBar({
  target: sidePanel.getPaneById('layers').element_.id,
  map: map
});

document.getElementById('')
