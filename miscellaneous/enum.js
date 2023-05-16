export const Params = {
    CONNECTION_PROPERTIES: {
        BASE_URL: 'http://localhost',
        FeatureServer: {
            Collections:'http://localhost:9000/FeatureServer/collections/',
            Functions:'http://localhost:9000/FeatureServer/functions/'
        },
        TREX_SERVER: 'http://localhost:6767/'
    },
    MAP: {
        CENTER: [103.859064, 13.441288],
        ZOOM: 12,
        LAYERS: {
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
                ZINDEX: 2
            }
        },
    },
    API_REQUESTOR: {
        ERROR: 'Erreur de requête'
    },
    STYLES: {
        FETCH_ERROR: 'Erreur lors de la récupération des styles'
    },
    TYPOLOGY: {
        FETCH_ERROR: 'Erreur lors de la récupération des types'
    }
}