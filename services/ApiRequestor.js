import { Params } from '../miscellaneous/enum';
import Notifier from '../miscellaneous/Notifier';

class ApiRequestor {
    // Fonction de requête générique
    static async getJSON(URL, {errorMsg} = {}) {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            return(json)
        } catch (error) {
            Notifier.Push('error', errorMsg, Params.API_REQUESTOR.ERROR)
            console.error(error)
        }
    };

    // Fonction de récupération des styles
    static async getStyles() {
        const result = await this.getJSON(`${Params.CONNECTION_PROPERTIES.FeatureServer.Functions}carto.get_styles/items`, {
            errorMsg: Params.STYLES.FETCH_ERROR
        })
        return result
    };

    // Fonction de récupération de la typologie
    static async getTypology() {
        const result = await this.getJSON(`${Params.CONNECTION_PROPERTIES.FeatureServer.Functions}carto.get_typology/items`, {
            errorMsg: Params.TYPOLOGY.FETCH_ERROR
        })
        return result
    };
}

export default ApiRequestor;