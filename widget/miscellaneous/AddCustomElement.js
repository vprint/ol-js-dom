import '@fortawesome/fontawesome-free/css/all.css';
import 'font-gis/css/font-gis.css'
import 'iconicss/dist/iconicss.css'


class AddCustomElement {

    static CreateToolbar({nb_groups}) {
        this.Toolbar = document.createElement("div")
        this.Toolbar.className="btn-toolbar"
        this.Toolbar.role = "toolbar"
        for (let i=0; i < nb_groups; i++) {
            this.AddButtonGroup(this.Toolbar, i)
        }
        return this.Toolbar
    }

    static AddButtonGroup(target, id) {
        let el= document.createElement('div');
        el.className = "btn-group me-2";
        el.role = "group";
        el.id = `group-${id}`;
        target.appendChild(el);
        return el;
    };

    static AddCustomButton({id, target, title, icon, isActive}) {
        let el = document.createElement('button');
        el.className = 'btn';
        el.id = id;
        el.title = title;
        el.innerHTML = `<i class="${icon}"</i>`;
        el.disabled = !isActive;
        target.appendChild(el);
        return el;
    };
}

export default AddCustomElement;