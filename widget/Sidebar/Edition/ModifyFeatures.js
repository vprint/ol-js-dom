import { Modify } from 'ol/interaction.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { LAYERS_SETTINGS } from '../../../Miscellaneous/enum';
import Utils from '../../../Miscellaneous/Utils';

class ModifyFeatures {
  constructor({map}) {
    this.map = map;
    this.feature = null

    this.EditLayer = Utils.getLayerByName(map, LAYERS_SETTINGS.EDITION_LAYER.NAME)
    
    this.modify = new Modify({
      source: this.EditLayer.getSource()
    });

    this.EnableEdition = function(e) {
      this.reset()
      this.feature = new GeoJSON().readFeatures(e, {
        featureProjection: 'EPSG:3857'
      });
      this.EditLayer.getSource().addFeatures(this.feature);
      this.map.addInteraction(this.modify);
    }

    this.CancelEdition = function() {
      this.reset()
    };
  };

  reset() {
    this.feature = null
    this.EditLayer.getSource().clear();
    this.map.removeInteraction(this.modify);
  }
};

export default ModifyFeatures;