import {EventEmitter} from "tiny-events";
import {Vec2} from "./Vec2";

/**
 * Input helper class
 *
 * @fires Input#movestart
 * @fires Input#move
 * @fires Input#moveend
 * @fires Input#dragstart
 * @fires Input#drag
 * @fires Input#dragend
 */
export class Input extends EventEmitter {
    /**
     * Input Helper
     *
     * @param {HTMLElement} element
     * @param {{}} options
     */
    constructor(element, options = {}) {
        super();
        this.element = element;

        this.draggingThreshold = options.draggingThreshold || 10;
        this.damper = options.damper || 0.2;
        this.damperVelocity = options.damperVelocity || 0.05;
        this.friction = options.friction || 0.2;
        this.dragOnly = options.dragOnly || false;

        this._shouldUpdate = false;
        this._dragging = false;
        this._isMoving = false;
        this.threshold = 0.001;
        this.lastUpdate = Date.now() / 1000 * 60;

        this.min = new Vec2(0, 0);
        this.max = new Vec2(element.offsetWidth, element.offsetHeight);
        this.lastTarget = new Vec2(0, 0);
        this.startPosition = new Vec2(0, 0);
        this.endPosition = new Vec2(0, 0);
        this.deltaPosition = new Vec2(0, 0);
        this.deltaTarget = new Vec2(0, 0);
        this.target = new Vec2(0, 0);
        this.position = new Vec2(0, 0);
        this.positionDirection = new Vec2(0, 0);
        this.targetDirection = new Vec2(0, 0);
        this.smoothedVelocity = new Vec2(0, 0);
        this.velocity = new Vec2(0, 0);
    }

    set dragging(state) {
        if (state && !this.dragging) {
            this._dragging = state;
            this.emit('dragstart');
        }
        if (!state && this.dragging) {
            this._dragging = state;
            this.emit('dragend');
        }
    }

    get dragging() {
        return this._dragging;
    }

    get shouldUpdate() {
        return this._shouldUpdate;
    }

    set shouldUpdate(state) {
        if (!state) {
            this._shouldUpdate = state;
            window.cancelAnimationFrame(this._raf);
        }

        if (state && !this.shouldUpdate) {
            this._shouldUpdate = state;
            this.update();
        }
    }

    get isMoving() {
        return this._isMoving;
    }

    set isMoving(state) {
        if (state === this.isMoving) return;

        if (state && !this.isMoving) {
            this.emit('movestart');
        }

        if (!state && this.isMoving) {
            this.emit('moveend');
        }

        this._isMoving = state;
    }

    update = () => {
        if (this.shouldUpdate) this._raf = window.requestAnimationFrame(this.update);

        const now = Date.now();
        const deltaTime = 1;
        this.lastUpdate = now;

        this.deltaPosition.set(
            this.target.x - this.position.x,
            this.target.y - this.position.y
        );

        this.deltaTarget.set(
            this.target.x - this.lastTarget.x,
            this.target.y - this.lastTarget.y,
        )
        this.lastTarget.assign(this.target);

        this.positionDirection.set(
            (this.deltaPosition.x > 0) ? 1 : ((this.deltaPosition.x < 0) ? -1 : 0),
            (this.deltaPosition.y > 0) ? 1 : ((this.deltaPosition.y < 0) ? -1 : 0)
        );

        this.targetDirection.set(
            (this.deltaTarget.x > 0) ? 1 : ((this.deltaTarget.x < 0) ? -1 : 0),
            (this.deltaTarget.y > 0) ? 1 : ((this.deltaTarget.y < 0) ? -1 : 0)
        );

        this.smoothedVelocity.set(
            this.deltaPosition.x / deltaTime,
            this.deltaPosition.y / deltaTime
        );

        this.velocity.set(
            this.deltaTarget.x,
            this.deltaTarget.y
        );

        // console.log(this.velocity);

        let _damper;
        if (this.dragging) {
            _damper = 1;
        } else {
            _damper = this.damper;
        }

        if (Math.abs(this.position.x - this.target.x) <= this.threshold) {
            this.position.x = this.target.x;
        } else {
            this.position.x += this.deltaPosition.x * _damper * deltaTime;
        }

        if (Math.abs(this.position.y - this.target.y) <= this.threshold) {
            this.position.y = this.target.y;
        } else {
            this.position.y += this.deltaPosition.y * _damper * deltaTime;
        }

        this.isMoving = this.position.distance(this.target) > 0;
    }

    onStart = (evt) => {
        const normalizedEvent = this.normalizeEvent(evt);
        this.startPosition.set(normalizedEvent.x, normalizedEvent.y);
        this.target.assign(this.startPosition);
        this.lastTarget.assign(this.target);
        this.position.assign(this.target);
        this.dragging = true;
        this.shouldUpdate = true;
    }

    /**
     * @param {TouchEvent} evt
     */
    onMove = (evt) => {
        const normalizedEvent = this.normalizeEvent(evt);

        if ((this.dragging && this.dragOnly) || this.dragOnly === false) {
            this.target.set(normalizedEvent.x, normalizedEvent.y).clamp(this.min, this.max)
            this.position.assign(this.target);
            this.emit('drag');
        }

        this.emit('move');
        this.shouldUpdate = true;
    }

    onEnd = () => {
        this.endPosition.set(
            this.target.x + Math.pow(this.velocity.x, 2) / (2 * this.friction * 9.80) * this.targetDirection.x,
            this.target.y + Math.pow(this.velocity.y, 2) / (2 * this.friction * 9.80) * this.targetDirection.y
        );

        this.target.assign(this.endPosition).clamp(this.min, this.max);

        this.dragging = false;
    }

    /**
     * Normalize a mousevent or a touchevent
     *
     * @param {MouseEvent|TouchEvent} evt
     */
    normalizeEvent(evt) {
        if (evt instanceof TouchEvent) {
            return {
                x: evt.touches[0].clientX,
                y: evt.touches[0].clientY
            }
        } else if (evt instanceof MouseEvent) {
            return {
                x: evt.clientX,
                y: evt.clientY
            }
        }
    }

    attach() {
        this.element.addEventListener('touchstart', this.onStart, false);
        this.element.addEventListener('touchmove', this.onMove, false);
        this.element.addEventListener('touchend', this.onEnd, false);
        this.element.addEventListener('mousedown', this.onStart, false);
        this.element.addEventListener('mousemove', this.onMove, false);
        this.element.addEventListener('mouseup', this.onEnd, false);
    }

    detach() {
        this.element.removeEventListener('touchstart', this.onStart, false);
        this.element.removeEventListener('touchmove', this.onMove, false);
        this.element.removeEventListener('touchend', this.onEnd, false);
        this.element.removeEventListener('mousedown', this.onStart, false);
        this.element.removeEventListener('mousemove', this.onMove, false);
        this.element.removeEventListener('mouseup', this.onEnd, false);
    }
}
