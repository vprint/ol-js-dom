import { Fill, Stroke, Style } from 'ol/style';

export const CONNECTION_PROPERTIES = {
    BASE_URL: 'http://localhost',
    FeatureServer: {
        LandingPage: 'http://localhost:9000/FeatureServer/',
        Collections:'http://localhost:9000/FeatureServer/collections/',
        Functions:'http://localhost:9000/FeatureServer/functions/',
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
    },
    SELECTION_LAYER: {
        ZINDEX: 3,
        NAME: 'Selection',
        STYLE: new Style({
            stroke: new Stroke({
                color: 'rgba(220,50,225,1)',
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(220,50,225,0.4)'
            })
        })
    },
    EDITION_LAYER: {
        ZINDEX: 4,
        NAME: 'Edition',
        STYLE: {
            'fill-color': 'rgba(255, 255, 255, 0.2)',
            'stroke-color': '#ffcc33',
            'stroke-width': 4,
            'circle-radius': 7,
            'circle-fill-color': '#ffcc33',
        },
    },
};

export const STYLE_SETTINGS = {
    DEFAULT_STYLE: new Style({
        fill: new Fill({
          color: 'rgba(255,255,255,0.4)'
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 1.25
        }),
    }),
};

export const API_REQUESTOR = {
    ERROR: 'Erreur de requête',
    STYLE_ERROR: 'Erreur lors de la récupération des styles',
    TYPOLOGY_ERROR: 'Erreur lors de la récupération des types',
    SERVER_ERROR: 'Erreur lors de la requête sur le serveur de données'
}
export const FEATURES_SETTINGS = {
    TYPOLOGY: {
        ID_TYPOLOGY_FIELD: 'id_typology',
        VALUE_TYPOLOGY_FIELD: 'typology_name',
        ID_STUDY_AREA: 80
    },
    OBSERVATION : 'commentaire'
}