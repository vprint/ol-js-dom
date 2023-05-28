import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import MVT from 'ol/format/MVT.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import ApiRequestor from '../Services/ApiRequestor';
import { LAYERS_SETTINGS, STYLE_SETTINGS, FEATURES_SETTINGS } from '../Miscellaneous/enum';
import { Fill, Stroke, Style } from 'ol/style';

class LayersAndStyle {
    constructor({ map }) {

        // Tuiles vectorielles Features
        this.features = new VectorTileLayer({
            source: new VectorTileSource({
                format: new MVT({
                    idProperty: 'id'
                }),
                url: `${LAYERS_SETTINGS.VECTOR_TILES.URL}/{z}/{x}/{y}.pbf`,
                attributions: LAYERS_SETTINGS.VECTOR_TILES.ATTRIBUTION
            }),
            zIndex: LAYERS_SETTINGS.VECTOR_TILES.ZINDEX,
            name: LAYERS_SETTINGS.VECTOR_TILES.NAME,
            preload: Infinity,
            style: cartoFunction
        });
        map.addLayer(this.features);

        // layer de sélection
        this.selectionLayer = new VectorTileLayer({
            renderMode: 'vector',
            source: this.features.getSource(),
            name: LAYERS_SETTINGS.SELECTION_LAYER.NAME,
            zIndex: LAYERS_SETTINGS.SELECTION_LAYER.ZINDEX,
        });
        map.addLayer(this.selectionLayer)

        this.editionLayer = new VectorLayer({
            source: new VectorSource(),
            zIndex: LAYERS_SETTINGS.EDITION_LAYER.ZINDEX,
            name: LAYERS_SETTINGS.EDITION_LAYER.NAME,
            style: LAYERS_SETTINGS.EDITION_LAYER.STYLE,
            visible: LAYERS_SETTINGS.EDITION_LAYER.VISIBLE
        });
        map.addLayer(this.editionLayer)

        // Fond de plan OSM
        this.osmLayer = new TileLayer({
            source: new OSM(),
            visible: false
        });
        map.addLayer(this.osmLayer);

        // Fond de plan JawgMaps
        this.JawgMapsStreets = new TileLayer({
            preload: 3,
            source: new XYZ({
                url: `${LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_STREETS.URL}access-token=${LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_STREETS.TOKEN}`,
                tilePixelRatio: 2,
                zIndex: 1,
                attributions: [LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_STREETS.ATTRIBUTION]
            }),
        zIndex:1
        });
        map.addLayer(this.JawgMapsStreets)
    }
};


// Requête d'obtention des styles
let JSONStyle = await ApiRequestor.getStyles();

// Cache de style
let StyleCache = [];

// Création des styles d'après les éléments renvoyés par .getStyles
if (JSONStyle) {
    for (let style of JSONStyle) {
        StyleCache[style.id_typology] = new Style({
            stroke: new Stroke({
                color: style.stroke_color || 'transparent',
                width: style.stroke_width || 0,
                lineDash: style.line_dash || null
            }),
            fill: new Fill({
                color: style.fill_color || 'transparent'
            }),
        });
    }
};


function cartoFunction(feature) {
    // Application des styles en fonction d'id_typology
    if (StyleCache[feature.get(FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD)]) {
        return StyleCache[feature.get(FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD)]
    }
    // Si le style n'est pas disponible alors le DEFAULT_STYLE est retourné
    else {
        return STYLE_SETTINGS.DEFAULT_STYLE
    }
};


export default LayersAndStyle;