
import Channel from 'chnl';
import throttle from 'lodash.throttle';

export default class ButtonsSensor {
    constructor() {
        this.onAction = new Channel();
        this._bindEl('button-move-left', 'left');
        this._bindEl('button-move-right', 'right');
    }

    _bindEl(selector, action) {
        document.getElementById(selector).addEventListener(
            'click',
            () => this.onAction.dispatch(action)
        );
    }
}