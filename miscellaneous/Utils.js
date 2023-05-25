class Utils {
    /**
     * Recherche un layer au sein des couches openlayers en fonction d'un nom
     * 
     * @param {Object} map - Une carte OpenLayer
     * @param {Object} layerName - Nom de la couche à rechercher
     * @returns {Object} Layer
     */
    static getLayerByName = (map, layerName) => {
        return map.getLayers().getArray().find(layer => layer.get('name') == layerName)
    }
}

export default Utils