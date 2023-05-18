import { Fill, Stroke, Style } from 'ol/style';

export const CONNECTION_PROPERTIES = {
    BASE_URL: 'http://localhost',
    FeatureServer: {
        Collections:'http://localhost:9000/FeatureServer/collections/',
        Functions:'http://localhost:9000/FeatureServer/functions/'
    },
    TREX_SERVER: 'http://localhost:6767/'
};

export const MAP_SETTINGS = {
    CENTER: [103.859064, 13.441288],
    ZOOM: 12
};

export const LAYERS_SETTINGS = {
    BACKGROUND: {
        JAWGMAPS_STREETS: {
            URL:'https://tile.jawg.io/jawg-streets/{z}/{x}/{y}@2x.png?',
            ATTRIBUTION:['<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'],
            TOKEN:'2GrZUqJYwWQq7Yjjh2U9D6BIwBfEYABjjQTXDeAoA1VHH8pPGqX08ruNfrpwSMbE',
            ZINDEX: 1
        },
    },
    VECTOR_TILES: {
        URL: 'http://localhost:6767/ANGKOR_QUALIF_TILESET',
        ATTRIBUTION: ['Tuiles locales'],
        ZINDEX: 2,
        NAME: 'Features'
    }
};

export const STYLE_SETTINGS = {
    FETCH_ERROR: 'Erreur lors de la récupération des styles',
    DEFAULT_STYLE: new Style({
        fill: new Fill({
          color: 'rgba(255,255,255,0.4)'
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 1.25
        }),
    })
};


export const API_REQUESTOR = {
    ERROR: 'Erreur de requête'
}
export const TYPOLOGY_SETTINGS = {
    FETCH_ERROR: 'Erreur lors de la récupération des types'
}