import VectorTileLayer from 'ol/layer/VectorTile.js';
import { FEATURES_SETTINGS, STYLE_SETTINGS, LAYERS_SETTINGS } from "../../../Miscellaneous/enum";
import Notifier from "../../../Miscellaneous/Notifier";
import ApiRequestor from "../../../Services/ApiRequestor";

class SelectFeatures {
  constructor({ map }) {

    // Liste des éléments sélectionnés
    this.selection = {};
    this.SelectionState = false;

    // Selection du layers de Feature
    this.FeaturesLayer = map.getLayers().getArray().find(layer => layer.get('name') == LAYERS_SETTINGS.VECTOR_TILES.NAME)

    // Layer de sélection
    this.selectionLayer = new VectorTileLayer({
      map: map,
      renderMode: 'vector',
      source: this.FeaturesLayer.getSource(),
      style: (feature) => {
        // La focntion viens récupérer les id présents dans la liste this.selection et styliser uniquement l'id présent dans cette liste.
        if (feature.getId() in this.selection) {
          return STYLE_SETTINGS.SELECTED_STYLE;
        }
      },
    });



    // Fonction d'ajout de l'interaction de selection
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
            this.selection = {};
            // Notification d'absence de données
            Notifier.Push({
              mode: 'warning',
              title: "Aucune entité sélectionnée",
              text: "Aucune entité n'a été trouvée au point sélectionné"
            });
            this.selectionLayer.changed();
            const UnSelectEvent = new CustomEvent('NoVectorTileFeatureSelected')
            window.dispatchEvent(UnSelectEvent);
            return;
          }

          // Recherche du premier élément d'un type différent que study_area
          const feature = features.find(element => element.get(FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD) !== FEATURES_SETTINGS.TYPOLOGY.ID_STUDY_AREA);

          const fid = feature.getId();

          this.selection = {};

          // Ajout de l'id à la liste des éléments séléctionnés
          this.selection[fid] = feature;

          // Rafraichissement du layer
          this.selectionLayer.changed();
          const SelectEvent = new CustomEvent('VectorTileFeatureSelected', {
            detail: feature.properties_
          });
          window.dispatchEvent(SelectEvent);

          this.get_OGCFeature(fid)
        });
      };
    };




    // Fonction de suppression de l'interaction
    this.RemoveSelectionInteraction = function () {
      if (this.SelectionState) {
        map.un('click', this.SelectElement);
        this.SelectionState = !this.SelectionState;
        this.selection = {};
        this.selectionLayer.changed();
      };
    };
  };

  /**
  * Défini les valeurs du formulaire.
  * 
  * @param {string} id - Id de la géométrie à selectionner
  * @returns {Object} - OGC Feature, format GeoJSON
  */
  async get_OGCFeature(id) {
    const OGCFeature = await ApiRequestor.getFeatureById(id)
    const OGCFeatureEvent = new CustomEvent('OGCFeature_Returned', {
      detail: OGCFeature
    });
    window.dispatchEvent(OGCFeatureEvent);
  };
};

export default SelectFeatures;