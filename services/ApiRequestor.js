import { CONNECTION_PROPERTIES, API_REQUESTOR, STYLE_SETTINGS, TYPOLOGY_SETTINGS} from '../Miscellaneous/enum';
import Notifier from '../Miscellaneous/Notifier';

class ApiRequestor {
    // Fonction de requête générique
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

    // Fonction de récupération des styles
    static async getStyles() {
        const result = await this.getJSON(`${CONNECTION_PROPERTIES.FeatureServer.Functions}carto.get_styles/items`, {
            errorMsg: STYLE_SETTINGS.FETCH_ERROR
        })
        return result
    };

    // Fonction de récupération de la typologie
    static async getTypology() {
        const result = await this.getJSON(`${CONNECTION_PROPERTIES.FeatureServer.Functions}carto.get_typology/items`, {
            errorMsg: TYPOLOGY_SETTINGS.FETCH_ERROR
        })
        return result
    };
    static async getFeatureServerStatus() {
        const result = await this.getJSON(CONNECTION_PROPERTIES.FeatureServer.LandingPage, {
            errorMsg: CONNECTION_PROPERTIES.FeatureServer.Error
        })
        if (!result) {
            return false
        } else {
            return true
        }
    };
}

export default ApiRequestor;