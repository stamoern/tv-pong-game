/**
 * Если телефон повёрнут в одну или в другую сторону на определённый угол,
 * то функция будет вызываться раз в секунду
 */

import Channel from 'chnl';
import throttle from 'lodash.throttle';
import status from './status';

const DEFAULT_OPTIONS = {
    zeroThreshold: 15,
    baseAngle: 90,
    thresholdAngle: 40,
    throttleTimeout: 1000,
};

export default class RotateSensor {
    /**
     * @param [options] {Object}
     * @param [options.baseAngle] {Number}
     * @param [options.thresholdAngle] {Number}
     * @param [options.throttleTimeout] {Number}
     */
    constructor(options = {}) {
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.isSupported = false;
        this.isStarted = false;
        this.prevEvent = null;
        this.onVerticalOrientationChange = new Channel();
        // this.onStart = new Channel();
        // this.onRotate.mute();
        // this.throttledDispatch = this._createThrottledDispatch();
        //window.addEventListener('deviceorientation', event => this._handleMotion(event));
    }

    _createThrottledDispatch() {
        return throttle(
            vote => this.onRotate.dispatch(vote),
            this.options.throttleTimeout,
            {leading: true, trailing: false}
        );
    }

    _start() {
        if (!this.isStarted) {
            this.onStart.dispatch();
            this.onStart.mute();
            this.onRotate.unmute();
            this.isStarted = true;
        }
    }

    _stop() {
        this.onStart.unmute();
        this.onRotate.mute();
        this.isStarted = false;
    }

    _handleMotion2(data) {
        const {alpha, beta, gamma} = data.do;
        document.getElementById('log').textContent = alpha + ' : ' + beta + ' : ' + gamma;
    }


    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent
     * @param event {DeviceMotionEvent}
     * @private
     */
    _handleMotion(event) {
        if (typeof event.beta !== 'number') {
            return;
        }
        const alpha = Math.round(event.alpha / 10);
        const beta = Math.round(event.beta / 10);
        const gamma = Math.round(event.gamma / 10);

        if (this.prevEvent && this.prevEvent.alpha === alpha && this.prevEvent.beta === beta
            && this.prevEvent.gamma === gamma) {
            return;
        } else {
            this.prevEvent = {alpha, beta, gamma};
        }

        document.getElementById('log').textContent = alpha + ' : ' + beta + ' : ' + gamma;

        // check portrait
        if (Math.abs(gamma) < 7) {
            this.onPortrait.dispatch();
            return;
        }


/*
        this.isSupported = true;
        const beta = event.beta - this.options.baseAngle;
        const betaAbs = Math.abs(beta);
        const gammaAbs = Math.abs(event.gamma);
        if (this._isAngleNearZero(betaAbs)) {
            this._start();
        }
        if (betaAbs > this.options.thresholdAngle && this._isAngleNearZero(gammaAbs)) {
            this.throttledDispatch(beta > 0);
            this._stop();
        }
        */
    }

    _isAngleNearZero(angle) {
        return Math.floor(angle / this.options.zeroThreshold) === 0
    }
}
