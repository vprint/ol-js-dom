import { LAYERS_SETTINGS } from "../Miscellaneous/enum";
import { Stroke, Fill, Style } from 'ol/style';
import VectorTileLayer from 'ol/layer/VectorTile.js'; 
import { TYPOLOGY_SETTINGS , STYLE_SETTINGS} from "../Miscellaneous/enum";

class SelectFeatures {
  constructor({map}) {
    
    // Liste des éléments sélectionnés
    this.selection = {};

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

    map.on('click', (e) => {
      let features = map.getFeaturesAtPixel(e.pixel)
      // Si aucune feature n'est intersecté ou si il n'y a qu'une feature de type study_area alors rien n'est retourné
      if (!features.length || (features.find(element => element.get(TYPOLOGY_SETTINGS.ID_TYPOLOGY_FIELD) == TYPOLOGY_SETTINGS.ID_STUDY_AREA) && features.length == 1)) {
        this.selection = {};
        this.selectionLayer.changed();
        return;
      }

      // Recherche du premier élément d'un type différent que study_area
      const feature = features.find(element => element.get(TYPOLOGY_SETTINGS.ID_TYPOLOGY_FIELD) !== TYPOLOGY_SETTINGS.ID_STUDY_AREA);

      const fid = feature.getId();
      this.selection = {};

      // Ajout de l'id à la liste des éléments séléctionnés
      this.selection[fid] = feature;

      // Rafraichissement du layer
      this.selectionLayer.changed();
    });
  }
}

export default SelectFeatures;