import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Modify } from 'ol/interaction.js';
import GeoJSON from 'ol/format/GeoJSON.js';

class ModifyFeatures {
  constructor({map}) {
    this.map = map;
    this.feature = null

    this.EditLayer = new VectorLayer({
      source: new VectorSource({
        features: this.feature
      }),
      zIndex: 3,
      style: {
        'fill-color': 'rgba(255, 255, 255, 0.2)',
        'stroke-color': '#ffcc33',
        'stroke-width': 2,
        'circle-radius': 7,
        'circle-fill-color': '#ffcc33',
      },
    });
    this.map.addLayer(this.EditLayer)

    this.EnableEdition = function(e) {
        this.feature = new GeoJSON().readFeatures(e, {
          featureProjection: 'EPSG:3857'
        });
        this.EditLayer.getSource().clear();
        this.EditLayer.getSource().addFeatures(this.feature);
        this.map.addInteraction(this.modify);
    }

    this.modify = new Modify({
      source: this.EditLayer.getSource()
    });

    this.CancelEdition = function() {
      this.feature = null
      this.EditLayer.getSource().clear();
      this.map.removeInteraction(this.modify);
    };
  };

  /*
  addEditionLayer() {
    this.map.addLayer(this.EditLayer)
  }
  removeEditionLayer() {
    this.map.removeLayer(this.EditLayer)
  }
  */
};

export default ModifyFeatures;