import { Modify } from 'ol/interaction.js';
import { LAYERS_SETTINGS } from '../../../Miscellaneous/enum';
import Utils from '../../../Miscellaneous/Utils';

class ModifyFeatures {
  constructor({map}) {
    this.map = map;

    this.EditLayer = Utils.getLayerByName(map, LAYERS_SETTINGS.EDITION_LAYER.NAME)
    
    this.modify = new Modify({
      source: this.EditLayer.getSource()
    });

    this.EnableEdition = function(e) {
      this.map.addInteraction(this.modify);
      this.EditLayer.setVisible(true);
    }

    this.CancelEdition = function() {
      this.map.removeInteraction(this.modify);
      this.EditLayer.setVisible(false);
    };
  };
};

export default ModifyFeatures;