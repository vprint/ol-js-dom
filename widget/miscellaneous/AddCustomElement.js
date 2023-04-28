
class AddCustomElement {
    static AddCustomGroupButton(nomClasse, nomRole, id, title, target) {
        let el= document.createElement('div');
        el.className = nomClasse;
        el.role = nomRole;
        el.id = id;
        el.ariaLabel = title;
        let parent = target;
        parent.appendChild(el)
        return el
    };

    static AddCustomButton(nomClass, id, title, icon, target, isActive) {
        let el = document.createElement('button');
        el.className = nomClass;
        el.id = id;
        el.title = title;
        el.innerHTML = icon;
        el.disabled = !isActive;
        target.appendChild(el)
        return el
    };
}

export default AddCustomElement;