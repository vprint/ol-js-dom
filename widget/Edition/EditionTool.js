import AddCustomElement from '../miscellaneous/AddCustomElement';

/**
 * @module widget/EditionTool
 */

class EditionTool {
  constructor(target) {

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
    })

    // Bouton de création
    this.CreateButton = AddCustomElement.AddCustomButton({
      id: 'create-geometry',
      target: this.SelectOrCreate.childNodes[0], 
      title: 'Create', 
      icon: 'fg-regular-shape-pt', 
      isActive : true,
      customClass: 'no-border-btn',
    })

    // Container d'édition
    this.panneau = document.createElement("div")
    this.panneau.className = 'edition-container'

    // Bouton de fermeture des modifications
    this.CloseButton = AddCustomElement.AddCustomButton({
      id: 'fermer-edition',
      target: this.panneau, 
      title: 'Fermer', 
      icon: 'fa-solid fa-xmark', 
      isActive : true,
      customMargin: '0.5em',
      customPosition: 'right'
    })

    // Selecteur de type
    this.SelectType = AddCustomElement.AddSelect({
      id: 'select-type', 
      target: this.panneau, 
      values: ['Temple','Mound','Water','Pound'],
    })

    // Textarea d'observation
    this.Observation = AddCustomElement.AddTextArea({
      id: 'input-observation', 
      target: this.panneau, 
      text: 'Observation'
    })

    // Barre d'action inférieure
    this.ActionTools = AddCustomElement.CreateToolbar({
      nb_groups: 3
    })
    this.panneau.appendChild(this.ActionTools)

    // Bouton suppression
    this.DropGeomButton = AddCustomElement.AddCustomButton({
      id: 'delete-geometry',
      target: this.ActionTools.childNodes[0], 
      title: 'Delete geometry', 
      icon: 'fa-solid fa-trash', 
      isActive : true,
      customClass: 'no-border-btn',
    })

    // Bouton édition
    this.EditGeomButton = AddCustomElement.AddCustomButton({
      id: 'edit-geometry',
      target: this.ActionTools.childNodes[1], 
      title: 'Edit geometry', 
      icon: 'fas fa-pen', 
      isActive : true,
      customClass: 'no-border-btn',
    })

    // Bouton retour arrière
    this.UndoEditButton = AddCustomElement.AddCustomButton({
      id: 'undo-edit',
      target: this.ActionTools.childNodes[1], 
      title: 'Undo edit', 
      icon: 'fas fa-undo', 
      isActive : true,
      customClass: 'no-border-btn',
    })

    // Bouton sauvegarder
    this.SaveEditButton = AddCustomElement.AddCustomButton({
      id: 'save-edit',
      target: this.ActionTools.childNodes[2], 
      title: 'Save edition', 
      icon: 'fa-sharp fa-solid fa-floppy-disk', 
      isActive : true,
      customClass: 'no-border-btn',
    })    
    



    // Ajout de la barre d'édition dans le panneau
    target.addWidgetElement(this.SelectOrCreate)

    // Ajout de l'outil d'edition
    target.addWidgetElement(this.panneau)
  };
}

export default EditionTool;
