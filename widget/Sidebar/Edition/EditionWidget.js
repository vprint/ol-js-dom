import EditionWidgetDOM from "./EditionWidgetDOM";
import ModifyFeatures from "./ModifyFeatures";
import SelectFeatures from './SelectFeatures';

class EditionWidget extends EditionWidgetDOM {
    constructor({target, map}) {
        super({target, map});

        // Définition du selecteur de géometrie
        this.FeatureSelector = new SelectFeatures({
            map: map
        });

        this.ModifyEngine = new ModifyFeatures({
            map: map
        })

        // Ajout de l'interaction de selection après un clic sur selectionner.
        this.SelectButton.addEventListener('click', () => {
            this.FeatureSelector.AddSelectionInteraction();
        });

        // Fonction d'ajout de la fenêtre d'édition
        this.AddEditionWidget = () => {
            target.addWidgetElement(this.panneau);
            this.EditGeomButton.disabled = true
            this.defineFormValues({
                form: this.form,
                element: this.FeatureSelector.selection.getProperties()
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
            this.FeatureSelector.RemoveSelectionInteraction();
            this.ModifyEngine.EnableEdition(this.FeatureSelector.OGCFeature)
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
        this.FeatureSelector.RemoveSelectionInteraction();
        this.EditGeomButton.disabled = true
        this.panneau.remove();
        this.ModifyEngine.CancelEdition();
    }

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
