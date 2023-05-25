import { CONNECTION_PROPERTIES, API_REQUESTOR} from '../Miscellaneous/enum';
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
            errorMsg: API_REQUESTOR.STYLE_ERROR
        })
        return result
    };

    /**
    * Récupération des valeurs de typologie
    */ 
    static async getTypology() {
        const result = await this.getJSON(`${CONNECTION_PROPERTIES.FeatureServer.Functions}carto.get_typology/items`, {
            errorMsg: API_REQUESTOR.TYPOLOGY_ERROR
        })
        return result
    };

    /**
    * Récupération des entités complètes
    * @param {string} id - id de la l'entité à récuperer
    */ 
    static async getFeatureById(id) {
        const result = await this.getJSON(`${CONNECTION_PROPERTIES.FeatureServer.Collections}carto.td_features/items?id=${id}`, {
            errorMsg: API_REQUESTOR.SERVER_ERROR
        })
        return result.features[0]
    };

    /**
    * Verification du status du serveur
    */ 
    static async getFeatureServerStatus() {
        const result = await this.getJSON(CONNECTION_PROPERTIES.FeatureServer.LandingPage, {
            errorMsg: API_REQUESTOR.SERVER_ERROR
        })
        return !result ? false : true
    };
}

export default ApiRequestor;