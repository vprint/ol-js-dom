import HandleRotation from './Action/HandleRotation'

/**
 * @module widget/EditBar
 */

class EditBar {
  constructor({target, map}) {

    // buton group
    this.buttonGroup = document.createElement('div');
    this.buttonGroup.classList.add('btn-group');
    this.buttonGroup.style.display = 'flex';
    this.buttonGroup.id = 'EditBar-1'

    // premier bouton
    this.button1 = document.createElement('button');
    this.button1.textContent = 'H';
    this.button1.id = 'button-1'
    this.button1.addEventListener('click', function() {
      HandleRotation(map)
    })
    this.buttonGroup.appendChild(this.button1);

    // deuxieme bouton
    this.button2 = document.createElement('button');
    this.button2.textContent = 'S';
    this.button2.id = 'button-2'
    
    this.buttonGroup.appendChild(this.button2);


    document.getElementById(target).appendChild(this.buttonGroup);
  };
}

export default EditBar;
