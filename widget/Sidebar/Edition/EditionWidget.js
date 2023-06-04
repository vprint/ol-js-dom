import ApiRequestor from "../../../Services/ApiRequestor";
import EditionWidgetDOM from "./EditionWidgetDOM";
import { Modify } from 'ol/interaction'
import ModifyFeatures from "./ModifyFeatures";
import SelectFeatures from './SelectFeatures';
import Utils from "../../../Miscellaneous/Utils";
import { LAYERS_SETTINGS } from "../../../Miscellaneous/enum";
import UndoRedo from 'ol-ext/interaction/UndoRedo'


class EditionWidget extends EditionWidgetDOM {
    constructor({target, map}) {
        super({target, map});
        this.map = map
        this.EditLayer = Utils.getLayerByName(map, LAYERS_SETTINGS.EDITION_LAYER.NAME)

        // Définition du selecteur de géometrie
        this.featureSelector = new SelectFeatures({
            map: map
        });

        this.ModifyEngine = new Modify({
            source : this.EditLayer.getSource()
        })
        map.addInteraction(this.ModifyEngine)
        this.ModifyEngine.setActive(false)


        this.undoInteraction = new UndoRedo({
            layers: [this.EditLayer]
        });
        map.addInteraction(this.undoInteraction)

        // Ajout de l'interaction de selection après un clic sur selectionner.
        this.SelectButton.addEventListener('click', () => {
            this.cancel()
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
        });

        // Ecouteur de selection des géométries OGC
        window.addEventListener('OGCFeature_Returned', () => {
            this.EditGeomButton.disabled = false
        });

        this.EditGeomButton.addEventListener('click', () => {
            if (!this.ModifyEngine.getActive()) {
                this.activateToolAndButton(true)
            } else {
                this.activateToolAndButton(false)
            }
        });

        this.DropGeomButton.addEventListener('click', async () => {
            const WFSFeature = this.getEditedFeature();
            await ApiRequestor.deleteFeature(WFSFeature);
            this.refreshEditionLayer();
            this.cancelSelectInteraction();
        });

        this.ModifyEngine.on('modifyend', () => {
            const historique = this.undoInteraction.getStack()
            if (historique[historique.length - 1].type == 'blockstart' && this.UndoEditButton.disabled) {
                this.UndoEditButton.disabled = false
            }
        });

        this.UndoEditButton.addEventListener('click', () => {
            this.undoInteraction.undo()
            const historique = this.undoInteraction.getStack()
            if (historique[historique.length - 1].type == 'addfeature') {
                this.UndoEditButton.disabled = true
            }
        });

        this.SaveEditButton.addEventListener('click', async () => {
            const WFSFeature = this.getEditedFeature();
            await ApiRequestor.updateFeature(WFSFeature);
            this.refreshEditionLayer();
            this.cancelSelectInteraction()
        });

        // suppression de l'interaction de selection après un clic sur fermer
        this.CloseButton.addEventListener('click', () => {
            this.cancel()
        })

        // Ecouteur d'événement pour la touche "Echap"
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.cancel()
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
        this.featureSelector.RemoveSelectionInteraction();
    }

    cancelModifyInteraction() {
        this.ModifyEngine.setActive(false);
        this.EditLayer.setVisible(false)
    }

    cancel() {
        this.activateToolAndButton(false)
        this.cancelSelectInteraction()
        this.cancelModifyInteraction()
    }

    /**
    * Formate et retourne la première entité de la couche d'édition
    */
    getEditedFeature() {
        const feature = this.featureSelector.feature;
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

    activateToolAndButton(bool) {
        if (bool === true) {
            this.ModifyEngine.setActive(true)
            this.EditLayer.setVisible(true);
            this.featureSelector.RemoveSelectionInteraction();
            this.EditGeomButton.textContent = ''
            const icon = document.createElement('i')
            icon.className = 'fas fa-pen'
            const text = document.createTextNode(' Cancel')
            this.EditGeomButton.append(icon)
            this.EditGeomButton.append(text)
            this.EditGeomButton.title = 'Cancel edit'
            this.DropGeomButton.disabled = false
        } else {
            this.ModifyEngine.setActive(false)
            this.EditLayer.setVisible(false);
            this.featureSelector.AddSelectionInteraction();
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
                textarea.value = (Object.values(element)[Object.keys(element).indexOf(i.dataset.field_ref)]) == null ? '' : (Object.values(element)[Object.keys(element).indexOf(i.dataset.field_ref)])
            }
            else {
                i.value = (Object.values(element)[Object.keys(element).indexOf(i.dataset.field_ref)])
            };
        };
    };
}

export default EditionWidget;
