import VectorTileLayer from 'ol/layer/VectorTile.js';
import { FEATURES_SETTINGS, STYLE_SETTINGS, LAYERS_SETTINGS } from "../../../Miscellaneous/enum";
import Notifier from "../../../Miscellaneous/Notifier";
import ApiRequestor from "../../../Services/ApiRequestor";
import Utils from '../../../Miscellaneous/Utils';

class SelectFeatures {
  constructor({ map }) {
    // Liste des éléments sélectionnés
    this.selection = null;
    this.SelectionState = false;
    this.OGCFeature = null;

    this.selectionLayer = Utils.getLayerByName(map, LAYERS_SETTINGS.SELECTION_LAYER.NAME)
    this.selectionLayer.setStyle(this.EditionStyle)

    // Evenement de sélection
    this.SelectEvent = new CustomEvent('VectorTileFeatureSelected');

    // Evenement de non-sélection
    this.UnSelectEvent = new CustomEvent('NoVectorTileFeatureSelected')

    // Evenement de sélection d'une entité complète
    this.OGCFeatureEvent = new CustomEvent('OGCFeature_Returned');

    /**
    * Fonction d'ajout de l'interaction de selection
    */
    this.AddSelectionInteraction = function () {
      if (!this.SelectionState) {
        this.SelectionState = !this.SelectionState;
        map.on('click', this.SelectElement = async (e) => {
          // Selection des éléments avec une tolérance de 5px
          let features = map.getFeaturesAtPixel(e.pixel, {
            hitTolerance: 5
          });
          // Si aucune feature n'est intersecté ou si il n'y a qu'une feature de type study_area alors rien n'est retourné
          if (!features.length || (features.find(element => element.get(FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD) == FEATURES_SETTINGS.TYPOLOGY.ID_STUDY_AREA) && features.length == 1)) {
            this.updateSelection(null, {alert: true})
          }
          else {
            // Recherche du premier élément d'un type différent que study_area
            const feature = features.find(element => element.get(FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD) !== FEATURES_SETTINGS.TYPOLOGY.ID_STUDY_AREA);
            this.updateSelection(feature, {alert: false})
            window.dispatchEvent(this.SelectEvent);
            this.get_OGCFeature(feature.getId())
          }
        });
      };
    };

    /**
    * Fonction de suppression de l'interaction de selection
    */
    this.RemoveSelectionInteraction = function () {
      if (this.SelectionState) {
        map.un('click', this.SelectElement);
        this.SelectionState = !this.SelectionState;
        this.updateSelection(null, {alert: false})
      };
    };
  };

  /**
  * Récupère les ids présents dans la liste this.selection et stylise uniquement la feature correspondante à l'id.
  */
  EditionStyle = (feature) => {
    if (this.selection) {
      if (feature.getId() === this.selection.getId()) {
        return LAYERS_SETTINGS.SELECTION_LAYER.STYLE;
      }
    }
  };

  /**
  * Défini les valeurs du formulaire.
  * 
  * @param {string} id - Id de la géométrie à selectionner
  * @returns {Object} - OGC Feature, format GeoJSON
  */
  async get_OGCFeature(id) {
    this.OGCFeature = await ApiRequestor.getFeatureById(id)
    window.dispatchEvent(this.OGCFeatureEvent);
  };
  
  /**
  * Cherche le layer d'édition au sein des couches openlayers
  * 
  * @param {Object} map - Une carte OpenLayer
  * @param {Object} layerName - Nom de la couche d'édition
  * @returns {Object} - Layer d'édition
  */
  getEditionLayer(map, layerName) {
    return map.getLayers().getArray().find(layer => layer.get('name') == layerName)
  }


  /**
  * Met à jour la valeur de selection
  * @param {Object} feature - Entité selectionnée
  */
  updateSelection(feature, {alert}) {
    this.selection = null;
    this.selection = feature;
    this.selectionLayer.changed();
    if (feature == null && alert == true) {
      Notifier.Push({
        mode: 'warning',
        title: "Aucune entité sélectionnée",
        text: "Aucune entité n'a été trouvée au point sélectionné"
      });
      window.dispatchEvent(this.UnSelectEvent);
    }
  }
};

export default SelectFeatures;