import AddCustomElement from '../miscellaneous/AddCustomElement';
import Bar from 'ol-ext/control/Bar'
import '../../node_modules/font-gis/css/font-gis.css'
import Control from 'ol/control/Control';

/**
 * @module widget/EditBar
 */

class EditBar {
  constructor({target, map}) {
    let editionBar = new Bar ({
      target: target
    })
    editionBar.addControl (new Rotate());


    /*
    console.log(target);
    let temp = document.getElementById(target)
    let temp2 = document.createElement("div")
    temp.appendChild(temp2)
    console.log(temp2)
    //.createElement("div");
    this.group = AddCustomElement.AddCustomGroupButton("btn-group", "toolbar", "EditionBar1", "Barre d'édition", temp2);
    AddCustomElement.AddCustomButton("button", "bouton1", "bouton1", '<i class="fg-regular-shape-pt"></i>', this.group, true);
    AddCustomElement.AddCustomButton("button", "bouton2", "bouton2", '<i class="fg-regular-shape-pt"></i>', this.group, true)

    this.group2 = AddCustomElement.AddCustomGroupButton("btn-group", "toolbar", "EditionBar1", "Barre d'édition", temp2);
    AddCustomElement.AddCustomButton("button", "bouton3", "bouton3", '<i class="fg-regular-shape-pt"></i>', this.group2, true);
    AddCustomElement.AddCustomButton("button", "bouton4", "bouton4", '<i class="fg-regular-shape-pt"></i>', this.group2, true)
    */
  };
}

export default EditBar;
