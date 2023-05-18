import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import ApiRequestor from '../services/ApiRequestor';
import { Params } from '../miscellaneous/enum';
import { Fill, Stroke, Style } from 'ol/style';

class LayersAndStyle {
    constructor({ map }) {

        // Tuiles vectorielles Features
        this.features = new VectorTileLayer({
            source: new VectorTileSource({
                format: new MVT(),
                url: `${Params.MAP.LAYERS.VECTOR_TILES.URL}/{z}/{x}/{y}.pbf`,
                attributions: Params.MAP.LAYERS.VECTOR_TILES.ATTRIBUTION,
            }),
            zIndex: Params.MAP.LAYERS.VECTOR_TILES.ZINDEX,
            style: cartoFunction
        });
        map.addLayer(this.features);

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
                url: `${Params.MAP.LAYERS.BACKGROUND.JAWGMAPS_STREETS.URL}access-token=${Params.MAP.LAYERS.BACKGROUND.JAWGMAPS_STREETS.TOKEN}`,
                tilePixelRatio: 2,
                zIndex: 1,
                attributions: [Params.MAP.LAYERS.BACKGROUND.JAWGMAPS_STREETS.ATTRIBUTION]
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
    if (StyleCache[feature.get('id_typology')]) {
        return StyleCache[feature.get('id_typology')]
    }
    // Si le style n'est pas disponible alors le DEFAULT_STYLE est retourné
    else {
        return Params.STYLES.DEFAULT_STYLE
    }
};


export default LayersAndStyle;