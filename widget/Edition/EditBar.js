import AddCustomElement from '../miscellaneous/AddCustomElement';

/**
 * @module widget/EditBar
 */

class EditBar {
  constructor(target) {
    // Creation de la toolbar générale
    this.Toolbar = AddCustomElement.CreateToolbar({
      nb_groups: 3
    })

    // Bouton de sélection
    this.SelectButton = AddCustomElement.AddCustomButton({
      id: 'S1',
      target: this.Toolbar.childNodes[0], 
      title: 'Select', 
      icon: 'fg-arrow-o', 
      isActive : true
    })

    // Bouton de création
    this.CreateButton = AddCustomElement.AddCustomButton({
      id: 'C2',
      target: this.Toolbar.childNodes[0], 
      title: 'Create', 
      icon: 'fg-regular-shape-pt', 
      isActive : true
    })

    // Bouton de deselection des géométries
    AddCustomElement.AddCustomButton({
      id: 'R3',
      target: this.Toolbar.childNodes[1], 
      title: 'Remove', 
      icon: 'far fa-trash-alt', 
      isActive : false
    })

    // Bouton de modification des géométries séléctionnées
    AddCustomElement.AddCustomButton({
      id: 'M4',
      target: this.Toolbar.childNodes[1], 
      title: 'Edit', 
      icon: 'fas fa-pen', 
      isActive : false
    })

    // Bouton de zoom sur les géométries séléctionnées
    AddCustomElement.AddCustomButton({
      id: 'Z5',
      target: this.Toolbar.childNodes[1], 
      title: 'Zoom to selection', 
      icon: 'fg-map-search', 
      isActive : false
    })

    // Bouton retour arrière
    AddCustomElement.AddCustomButton({
      id: 'U6',
      target: this.Toolbar.childNodes[2], 
      title: 'Undo', 
      icon: 'fas fa-undo', 
      isActive : false
    })

    // Bouton enregistrer
    AddCustomElement.AddCustomButton({
      id: 'S7',
      target: this.Toolbar.childNodes[2], 
      title: 'Save', 
      icon: 'far fa-save', 
      isActive : false
    })

    // Bouton supprimer
    AddCustomElement.AddCustomButton({
      id: 'D8',
      target: this.Toolbar.childNodes[2], 
      title: 'Delete', 
      icon: 'fas fa-times', 
      isActive : false
    })

    // Bouton Cancel Edit
    AddCustomElement.AddCustomButton({
      id: 'C9',
      target: this.Toolbar.childNodes[2], 
      title: 'Cancel', 
      icon: 'icss-edit-off', 
      isActive : false
    })

    
    target.addWidgetElement(this.Toolbar)
  };
}

export default EditBar;
