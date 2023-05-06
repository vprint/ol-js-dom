import { SidePanel } from 'ol-side-panel';
import EditionTool from './Edition/EditionTool';
import '@fortawesome/fontawesome-free/css/all.css';

/**
 * @module widget
 */

class LeftSidebar {
  Sidebar;
  layersPane;
  constructor(map) {

    // Creation sidebar
    this.Sidebar = new SidePanel
    map.addControl(this.Sidebar);

    // Ajout d'un panneau
    this.layersPane = this.Sidebar.definePane({
      paneId: 'layers',
      name: "Layers",
      icon: '<i class="fa-sharp fa-solid fa-layer-group" style="position:relative;left:-3px;top:-6px"</i>'
    });

    // Ajout de l'outil de sélection et de création
    new EditionTool(this.layersPane)
  }
}

export default LeftSidebar;