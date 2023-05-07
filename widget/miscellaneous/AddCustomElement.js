import '@fortawesome/fontawesome-free/css/all.css';
import { Button } from 'bootstrap';
import 'font-gis/css/font-gis.css'
import 'iconicss/dist/iconicss.css'


class AddCustomElement {

    static CreateToolbar({nb_groups, position, spacingType, action}) {
        let el = document.createElement("div")
        el.className="btn-toolbar"
        el.role = "toolbar"
        for (let i=0; i < nb_groups; i++) {
            this.AddButtonGroup(el, i, spacingType)
        }
        el.style.textAlign = position === undefined ? '' : position;
        return el
    }

    static AddButtonGroup(target, id, spacingType) {
        let el= document.createElement('div');
        el.className = `btn-group ${spacingType === undefined ? 'me-2' : spacingType}`;
        el.role = "group";
        el.id = `group-${id}`;
        target.appendChild(el);
        return el;
    };

    static AddCustomButton({id, target, title, icon, isActive, text, customClass}) {
        let el = document.createElement('button');
        el.id = id;
        el.title = title;
        el.innerHTML = `<i class="${icon}"</i>`;
        el.appendChild(document.createTextNode(text === undefined ? '' : `  ${text}`))
        el.disabled = !isActive;
        el.className = customClass === undefined ? '.ol-control button' : customClass;
        target.appendChild(el);
        return el;
    };
    
    static AddSelect({id, target, values}) {
        let el = document.createElement('select')
        el.id = id
        el.className = 'form-select';
        for (let i of values) {
            let option = document.createElement('option')
            option.value = values.indexOf(i)
            option.textContent = i
            el.appendChild(option)
        }
        target.appendChild(el)
    }

    static AddTextArea({id, target, text}) {
        let el = document.createElement('div');
        el.id = id;
        el.className = 'input-group';
        let span = document.createElement('span');
        span.className = 'input-group-text';
        span.textContent = text;
        let input = document.createElement('textarea');
        input.className = 'form-control';
        el.append(span, input);
        target.appendChild(el)
        return el;
    }
}

export default AddCustomElement;