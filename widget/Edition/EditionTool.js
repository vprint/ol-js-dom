import AddCustomElement from '../miscellaneous/AddCustomElement';

/**
 * @module widget/EditionTool
 */

class EditionTool {
  constructor(target) {

    // Creation de la toolbar générale
    this.Toolbar = AddCustomElement.CreateToolbar({
      nb_groups: 1
    })

    // Bouton de sélection
    this.SelectButton = AddCustomElement.AddCustomButton({
      id: 'select-geometry',
      target: this.Toolbar.childNodes[0], 
      title: 'Select', 
      icon: 'fg-arrow-o', 
      isActive : true
    })

    // Bouton de création
    this.CreateButton = AddCustomElement.AddCustomButton({
      id: 'create-geometry',
      target: this.Toolbar.childNodes[0], 
      title: 'Create', 
      icon: 'fg-regular-shape-pt', 
      isActive : true
    })

    // Container d'édition
    this.panneau = document.createElement("div")

    // Bouton de fermeture des modifications
    this.CloseButton = AddCustomElement.AddCustomButton({
      id: 'fermer-edition',
      target: this.panneau, 
      title: 'Fermer', 
      icon: 'fa-solid fa-xmark', 
      isActive : true
    })

    // Selecteur de type
    this.SelectType = AddCustomElement.AddSelect({
      id: 'select-type', 
      target: this.panneau, 
      values: ['Temple','Mound','Water','Pound']
    })

    // Textarea d'observation
    this.Observation = AddCustomElement.AddTextArea({
      id: 'input-observation', 
      target: this.panneau, 
      text: 'Observation'
    })

    // Ajout de la barre d'édition dans le panneau
    target.addWidgetElement(this.Toolbar)
    // Ajout de l'outil d'edition
    target.addWidgetElement(this.panneau)

  };
}

export default EditionTool;
