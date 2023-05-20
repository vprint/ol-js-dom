import EditionWidgetDOM from "./EditionWidgetDOM";
import SelectFeatures from '../../../MapElement/SelectFeatures';
import { TYPOLOGY_SETTINGS, OBSERVATION_SETTINGS } from "../../../Miscellaneous/enum";

class EditionWidget extends EditionWidgetDOM {
    constructor({target, map}) {
        super({target, map});

        // Définition du selecteur de géometrie
        this.FeatureSelector = new SelectFeatures({
            map: map
        });

        // Ajout de l'interaction de selection après un clic sur selectionner.
        this.SelectButton.addEventListener('click', () => {
            this.FeatureSelector.AddSelectionInteraction();
        });

        // Fonction d'ajout de la fenêtre d'édition
        this.AddEditionWidget = (e) => {
            target.addWidgetElement(this.panneau);
            this.EditGeomButton.disabled = true
            
            defineFormValues({
                form: this.form,
                element: e.detail
            })

            /*
            if (this.form.children) {
                console.log(this.form.querySelectorAll('.input-group'))
            }

            console.log(Object.values(e.detail)[Object.keys(e.detail).indexOf(this.SelectType.dataset.field_ref)])

            // Definition du type*

            defineSelectedOption({
                target: this.SelectType, 
                element: e.detail[TYPOLOGY_SETTINGS.ID_TYPOLOGY_FIELD],
                valuePosition: '.attributes.value.value'
            })
            
            // Definition du texte
            defineText({
                target: this.Observation,
                element: e.detail[OBSERVATION_SETTINGS.VALUE_OBSERVATION_FIELD]
            })
            */
        }

        // Ecouteur de sélection de tuiles vectorielles
        window.addEventListener('VectorTileFeatureSelected', this.AddEditionWidget);
        window.addEventListener('NoVectorTileFeatureSelected', () => {
            this.panneau.remove()
        });
        
        window.addEventListener('ComplexeFeatureReturned', (e) => {
            //console.log(e.detail)
            this.EditGeomButton.disabled = false
        });
        
        // Fonction de suppression de l'interaction de selection
        this.CloseButton.addEventListener('click', () => {
            this.FeatureSelector.RemoveSelectionInteraction();
            this.EditGeomButton.disabled = true
            this.panneau.remove();
        })
    }
}

function defineFormValues({form, element}) {
    for (let i of form.children) {
        if (i.className == 'input-group') {
            let textarea = i.querySelector('.form-control')
            textarea.value = (Object.values(element)[Object.keys(element).indexOf(i.dataset.field_ref)])
        }
        else {
            i.value = (Object.values(element)[Object.keys(element).indexOf(i.dataset.field_ref)])
        }
    }
}

/**
 * Défini l'option sélectionnée en fonction de l'entité sélectionnée.
 * 
 * @param {HTMLElement} target
 * @param {string} element
 * @param {string} valuePosition
 */
/*
function defineSelectedOption({target, element, valuePosition}) {
    const selectOptions = Array.from(target.options);
    const elementToSelect = element;
    const optionToSelect = selectOptions.find(item => eval(`item${valuePosition}`) == elementToSelect)
    optionToSelect.selected = true
}

/**
 * Défini le texte d'observation pour l'entité sélectionnée
 * 
 * @param {HTMLElement} target
 * @param {string} element
 */
/*
function defineText({target, element}) {
    target.querySelector('textarea').value = element;
}
*/

export default EditionWidget;
