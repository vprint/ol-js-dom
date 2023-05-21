import { CONNECTION_PROPERTIES, API_REQUESTOR, STYLE_SETTINGS, FEATURES_SETTINGS} from '../Miscellaneous/enum';
import Notifier from '../Miscellaneous/Notifier';

class ApiRequestor {
    /**
    * Requêtes génériques
    * @param {string} URL - URL de la requête
    * @param {string} errorMsg - Message d'erreur
    * @returns {Promise<Object>} Objet JSON
    */ 
    static async getJSON(URL, {errorMsg} = {}) {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            return(json)
        } catch (error) {
            Notifier.Push({
                mode: 'error', 
                text: errorMsg,
                title: API_REQUESTOR.ERROR
            })
            console.error(error)
        }
    };

    /**
    * Récupération des styles
    */ 
    static async getStyles() {
        const result = await this.getJSON(`${CONNECTION_PROPERTIES.FeatureServer.Functions}carto.get_styles/items`, {
            errorMsg: STYLE_SETTINGS.FETCH_ERROR
        })
        return result
    };

    /**
    * Récupération des valeurs de typologie
    */ 
    static async getTypology() {
        const result = await this.getJSON(`${CONNECTION_PROPERTIES.FeatureServer.Functions}carto.get_typology/items`, {
            errorMsg: FEATURES_SETTINGS.TYPOLOGY.FETCH_ERROR
        })
        return result
    };

    /**
    * Récupération des entités complètes
    * @param {string} id - id de la l'entité à récuperer
    */ 
    static async getFeatureById(id) {
        const result = await this.getJSON(`${CONNECTION_PROPERTIES.FeatureServer.Collections}carto.td_features/items?id=${id}`, {
            errorMsg: CONNECTION_PROPERTIES.FeatureServer.Error
        })
        return result.features[0]
    };

    /**
    * Verification du status du serveur
    */ 
    static async getFeatureServerStatus() {
        const result = await this.getJSON(CONNECTION_PROPERTIES.FeatureServer.LandingPage, {
            errorMsg: CONNECTION_PROPERTIES.FeatureServer.Error
        })
        return !result ? false : true
    };
}

export default ApiRequestor;