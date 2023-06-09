import AddCustomElement from '../../../Miscellaneous/AddCustomElement';
import ApiRequestor from '../../../Services/ApiRequestor';
import { API_REQUESTOR, FEATURES_SETTINGS } from '../../../Miscellaneous/enum';

class EditionWidgetDOM {
  constructor({target, map}) {
    // Creation de la barre de sélection/création
    this.SelectOrCreate = AddCustomElement.CreateToolbar({
      nb_groups: 1
    })

    // Bouton de sélection
    this.SelectButton = AddCustomElement.AddCustomButton({
      id: 'select-geometry',
      target: this.SelectOrCreate.childNodes[0], 
      title: 'Select', 
      icon: 'fg-arrow-o', 
      isActive : true,
      customClass: 'no-border-btn',
      text: 'Select'
    })

    // Bouton de création
    this.CreateButton = AddCustomElement.AddCustomButton({
      id: 'create-geometry',
      target: this.SelectOrCreate.childNodes[0], 
      title: 'Create', 
      icon: 'fg-regular-shape-pt', 
      isActive : true,
      customClass: 'no-border-btn',
      text: 'Create'
    })

    // Container d'édition
    this.panneau = document.createElement("div")
    this.panneau.className = 'edition-container'
    this.panneau.id = 'edition-container'

    // Formulaire
    this.form = document.createElement('form')
    this.form.id = 'edition-form'

    // Bouton de fermeture des modifications
    this.CloseButton = AddCustomElement.AddCustomButton({
      id: 'fermer-edition',
      target: this.panneau, 
      title: 'Fermer', 
      icon: 'fa-solid fa-xmark', 
      isActive: true,
      customClass: 'close-btn'
    })

    // Selecteur de type
    this.SelectType = AddCustomElement.AddSelect({
      id: 'select-type', 
      target: this.form, 
      values: typology,
      indexField: FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD,
      valueField: FEATURES_SETTINGS.TYPOLOGY.VALUE_TYPOLOGY_FIELD,
      error: API_REQUESTOR.TYPOLOGY_ERROR
    })

    // Textarea d'observation
    this.Observation = AddCustomElement.AddTextArea({
      id: 'input-observation', 
      target: this.form, 
      text: 'Observation',
      field_ref: FEATURES_SETTINGS.OBSERVATION
    })

    this.panneau.appendChild(this.form)

    // Barre d'action inférieure
    this.ActionTools = AddCustomElement.CreateToolbar({
      nb_groups: 3,
      spacingType: 'me-3'
    })
    this.panneau.appendChild(this.ActionTools)

    // Bouton édition
    this.EditGeomButton = AddCustomElement.AddCustomButton({
      id: 'edit-geometry',
      target: this.ActionTools.childNodes[0], 
      title: 'Edit geometry', 
      icon: 'fas fa-pen', 
      isActive : false,
      customClass: 'no-border-btn',
      text: 'Edit'
    })

    // Bouton suppression
    this.DropGeomButton = AddCustomElement.AddCustomButton({
      id: 'delete-geometry',
      target: this.ActionTools.childNodes[1], 
      title: 'Delete geometry', 
      icon: 'fa-solid fa-trash', 
      isActive : false,
      customClass: 'no-border-btn',
      text: 'Delete'
    })

    // Bouton retour arrière
    this.UndoEditButton = AddCustomElement.AddCustomButton({
      id: 'undo-edit',
      target: this.ActionTools.childNodes[1], 
      title: 'Undo edit', 
      icon: 'fas fa-undo', 
      isActive : false,
      customClass: 'no-border-btn',
      text: 'Undo'
    })

    // Bouton sauvegarder
    this.SaveEditButton = AddCustomElement.AddCustomButton({
      id: 'save-edit',
      target: this.ActionTools.childNodes[2], 
      title: 'Save edition', 
      icon: 'fa-sharp fa-solid fa-floppy-disk',
      text : 'Save',
      isActive : true,
      customClass: 'no-border-btn',
    })    

    // Ajout de la barre d'édition dans le panneau
    target.addWidgetElement(this.SelectOrCreate)
  };
}

let typology = await ApiRequestor.getTypology()

export default EditionWidgetDOM;
