import { SidePanel } from 'ol-side-panel';

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
  }
}

export default LeftSidebar;