import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

class Notifier {
    static CreateNotify(mode, text, title, timout) {
        new Notify ({
            status: mode,
            title: title,
            text: text,
            effect: 'fade',
            speed: 300,
            customClass: '',
            customIcon: '',
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: timout,
            gap: 20,
            distance: 20,
            type: 1,
            position: 'right top'
        })
    }
    static Push(mode, text, title) {
        switch (mode) {
            case 'success':
                this.CreateNotify(mode, text, title, 3000)
                break;
            case 'warning':
                this.CreateNotify(mode, text, title, 3000)
                break;
            case 'error':
                this.CreateNotify(mode, text, title, 10000)
                break;
        }
    }
}

export default Notifier;