import { SidePanel } from 'ol-side-panel';
import EditBar from './Edition/EditBar';

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
      icon: 'Y'
    });

    new EditBar(this.layersPane)
  }
}

export default LeftSidebar;