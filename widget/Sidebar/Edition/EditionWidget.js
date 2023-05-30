import ApiRequestor from "../../../Services/ApiRequestor";
import EditionWidgetDOM from "./EditionWidgetDOM";
import ModifyFeatures from "./ModifyFeatures";
import SelectFeatures from './SelectFeatures';
import Utils from "../../../Miscellaneous/Utils";
import { LAYERS_SETTINGS } from "../../../Miscellaneous/enum";
import UndoRedo from 'ol-ext/interaction/UndoRedo'


class EditionWidget extends EditionWidgetDOM {
    constructor({target, map}) {
        super({target, map});
        this.map = map

        this.undoInteraction = new UndoRedo();
        map.addInteraction(this.undoInteraction)

        // Définition du selecteur de géometrie
        this.featureSelector = new SelectFeatures({
            map: map
        });

        this.ModifyEngine = new ModifyFeatures({
            map: map
        })

        // Ajout de l'interaction de selection après un clic sur selectionner.
        this.SelectButton.addEventListener('click', () => {
            this.featureSelector.AddSelectionInteraction();
        });

        // Fonction d'ajout de la fenêtre d'édition
        this.AddEditionWidget = () => {
            target.addWidgetElement(this.panneau);
            this.EditGeomButton.disabled = true
            this.defineFormValues({
                form: this.form,
                element: this.featureSelector.selection.getProperties()
            })
        }

        // Ecouteur de sélection de tuiles vectorielles
        window.addEventListener('VectorTileFeatureSelected', this.AddEditionWidget);
        window.addEventListener('NoVectorTileFeatureSelected', () => {
            this.panneau.remove()
            this.ModifyEngine.CancelEdition();
        });

        // Ecouteur de selection des géométries OGC
        window.addEventListener('OGCFeature_Returned', () => {
            this.EditGeomButton.disabled = false
        });

        this.EditGeomButton.addEventListener('click', () => {
            if (!this.ModifyEngine.ModifyState) {
                //this.featureSelector.RemoveSelectionInteraction();
                this.ModifyEngine.EnableEdition()
                this.activateTools(true)
            } else {
                this.featureSelector.AddSelectionInteraction();
                this.ModifyEngine.CancelEdition()
                this.activateTools(false)
            }
        });

        this.DropGeomButton.addEventListener('click', async () => {
            const WFSFeature = this.getEditedFeature();
            await ApiRequestor.deleteFeature(WFSFeature);
            this.refreshEditionLayer();
            this.cancelSelectInteraction();
        });

        this.ModifyEngine.modify.on('modifyend', () => {
            //this.UndoEditButton.disabled = false
            console.log(this.featureSelector.getFeature)
        });

        this.UndoEditButton.addEventListener('click', () => {
            console.log((this.undoInteraction.getStack()).slice(-1))
            this.undoInteraction.undo()
        });

        this.SaveEditButton.addEventListener('click', async () => {
            const WFSFeature = this.getEditedFeature();
            await ApiRequestor.updateFeature(WFSFeature);
            this.refreshEditionLayer();
            this.cancelSelectInteraction()
        });

        // suppression de l'interaction de selection après un clic sur fermer
        this.CloseButton.addEventListener('click', () => {
            this.cancelSelectInteraction()
        })

        // Ecouteur d'événement pour la touche "Echap"
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.cancelSelectInteraction();
            }
        });
    }

    /**
    * Supprime l'interaction de sélection
    */
    cancelSelectInteraction() {
        //this.featureSelector.RemoveSelectionInteraction();
        this.EditGeomButton.disabled = true
        this.panneau.remove();
        this.ModifyEngine.CancelEdition();
    }

    /**
    * Formate et retourne la première entité de la couche d'édition
    */
    getEditedFeature() {
        const feature = this.featureSelector.EditLayer.getSource().getFeatures()[0];
        const WFSFeature = this.featureToWFS(feature);
        return WFSFeature
    };

    /**
    * Rafraichi la couche d'édition
    */
    refreshEditionLayer() {        
        const vectorLayer = Utils.getLayerByName(this.map, LAYERS_SETTINGS.VECTOR_TILES.NAME)
        vectorLayer.getSource().refresh()
    };

    /**
    * Récupère les valeurs du formulaire et formate l'entité afin de la rendre "transact-wfs-compatible"
    * @param {Object} feature - Valeurs à appliquer
    */
    featureToWFS(feature) {
        feature.set('id_typology', this.SelectType.value);
        feature.set('commentaire', document.querySelector('.form-control').value);
        feature.setGeometryName('geom');
        feature.unset('id');
        return feature;
    }

    activateTools(e) {
        if (e === true) {
            this.EditGeomButton.textContent = ''
            const icon = document.createElement('i')
            icon.className = 'fas fa-pen'
            const text = document.createTextNode(' Cancel')
            this.EditGeomButton.append(icon)
            this.EditGeomButton.append(text)
            this.EditGeomButton.title = 'Cancel edit'
            this.DropGeomButton.disabled = false
        } else {
            this.EditGeomButton.textContent = ''
            const icon = document.createElement('i')
            icon.className = 'fas fa-pen'
            const text = document.createTextNode(' Edit')
            this.EditGeomButton.append(icon)
            this.EditGeomButton.append(text)
            this.EditGeomButton.title = 'Edit geometry'
            this.DropGeomButton.disabled = true
            this.UndoEditButton.disabled = true
        }
    };

    /**
    * Défini les valeurs du formulaire.
    * 
    * @param {HTMLElement} form - formulaire en entrée
    * @param {string} element - Valeurs à appliquer
    */
    defineFormValues({form, element}) {
        for (let i of form.children) {
            // Gestion des textarea
            if (i.className == 'input-group') {
                let textarea = i.querySelector('.form-control')
                textarea.value = (Object.values(element)[Object.keys(element).indexOf(i.dataset.field_ref)])
            }
            else {
                i.value = (Object.values(element)[Object.keys(element).indexOf(i.dataset.field_ref)])
            };
        };
    };
}

export default EditionWidget;
