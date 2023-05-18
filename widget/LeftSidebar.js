import { SidePanel } from 'ol-side-panel';
import EditionWidget from './Sidebar/Edition/EditionWidget';
import '@fortawesome/fontawesome-free/css/all.css';

class LeftSidebar {
  constructor({target}) {

    // Creation sidebar
    this.Sidebar = new SidePanel()
    target.addControl(this.Sidebar);

    // Ajout d'un panneau
    this.layersPane = this.Sidebar.definePane({
      paneId: 'layers',
      name: "Layers",
      icon: '<i class="fa-solid fa-database" style="position:relative;left:-1px;top:-7px"</i>'
    });

    // Ajout de l'outil de sélection et de création
    new EditionWidget({
      target: this.layersPane,
      map: target
    })
  }
}

export default LeftSidebar;