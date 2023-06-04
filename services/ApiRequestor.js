import { CONNECTION_PROPERTIES, API_REQUESTOR} from '../Miscellaneous/enum';
import Notifier from '../Miscellaneous/Notifier';
import WFS from 'ol/format/WFS';

class ApiRequestor {
    /**
    * Requêtes génériques
    * @param {string} URL - URL de la requête
    * @param {string} errorMsg - Message d'erreur
    * @returns {Promise<Object>} Objet JSON
    */ 
    static async getJSON(URL, {errorMsg}) {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            return json
        } catch (error) {
            Notifier.Push({
                mode: 'error', 
                text: errorMsg,
                title: API_REQUESTOR.ERROR
            })
            console.error(error)
        }
    };

    static async postJSON(URL, {body, errorMsg}) {
        try {
            const response = await fetch (URL, {
                mode: 'cors',
                cache: 'default',
                method: 'POST',
                body: body
            });
            return response
        } catch (error) {
            Notifier.Push({
                mode: 'error', 
                text: errorMsg,
                title: API_REQUESTOR.ERROR
            })
            console.error(error)
        }
    }

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

    static async transactWFS(mode, feature) {
        const wfsSerializer = new WFS();
        const xmlSerializer = new XMLSerializer();
        let transactionRequest = null;
        const defaultParam = {
            featureNS: CONNECTION_PROPERTIES.GEOSERVER.FEATURES.SERVICE_PREFIX,
            srsName: 'EPSG:3857',
            featurePrefix: CONNECTION_PROPERTIES.GEOSERVER.FEATURES.SERVICE_PREFIX,
            featureType: CONNECTION_PROPERTIES.GEOSERVER.FEATURES.NAME
        };
        switch (mode) {
            case 'insert':
                transactionRequest = wfsSerializer.writeTransaction([feature], null, null, defaultParam);
                break;
            case 'update':
                transactionRequest = wfsSerializer.writeTransaction(null, [feature], null, defaultParam);
                break;
            case 'delete':
                transactionRequest = wfsSerializer.writeTransaction(null, null, [feature], defaultParam);
                break;
        }
        const wfsUpdateAsString = xmlSerializer.serializeToString(transactionRequest);
        const wfsRequest = await this.postJSON(CONNECTION_PROPERTIES.GEOSERVER.URL, {
            body: wfsUpdateAsString,
            errorMsg: CONNECTION_PROPERTIES.GEOSERVER.ERROR
        })
        const transactionResult = new WFS().readTransactionResponse(await wfsRequest.text())
        return transactionResult.transactionSummary
    }

    /**
    * Création d'entité
    * @param {Object} feature - entité à insérer
    */ 
    static async insertFeature(feature) {
        const createFeature = await this.transactWFS('insert', feature)
        if (createFeature.totalInserted === 1) {
            Notifier.Push({
                mode: 'success',
                title: 'Insertion effectuée',
                text: 'La géométrie a été créée avec succès'
            })
        } else {
            Notifier.Push({
                mode: 'error',
                title: "Echec de l'insertion'",
                text: "La géométrie n'a pas été créée"
            })
        }
    }

    /**
    * Mise à jour d'entité
    * @param {Object} feature - entité à mettre à jour
    */
    static async updateFeature(feature) {
        const updateFeature = await this.transactWFS('update', feature)
        if (updateFeature.totalUpdated === 1) {
            Notifier.Push({
                mode: 'success',
                title: 'Enregistrement effectué',
                text: 'La géométrie a été enregistrée avec succès'
            })
        } else {
            Notifier.Push({
                mode: 'error',
                title: "Echec de l'enregistrement",
                text: "La géométrie n'a pas été enregistrée"
            })
        }
    };

    /**
    * Suppression d'entité
    * @param {Object} feature - entité à supprimer
    */ 
    static async deleteFeature(feature) {
        const deleteFeature = await this.transactWFS('delete', feature)
        if (deleteFeature.totalDeleted === 1) {
            Notifier.Push({
                mode: 'success',
                title: 'Suppression effectuée',
                text: 'La géométrie a été supprimée avec succès'
            })
        } else {
            Notifier.Push({
                mode: 'error',
                title: "Echec de la suppression",
                text: "La géométrie n'a pas été supprimée"
            })
        }
    }
}

export default ApiRequestor;