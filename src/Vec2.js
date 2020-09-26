export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Set members of the vector
     *
     * @param {number} x
     * @param {number} y
     */
    set(x, y) {
        this.x = x;
        this.y = y;

        return this;
    }

    /**
     * Assign members of the vector using another vector
     *
     * @param {Vec2} vec
     */
    assign(vec) {
        this.x = vec.x;
        this.y = vec.y;

        return this;
    }

    /**
     * Clamp the vector to a min and a max vector
     *
     * @param {Vec2} min
     * @param {Vec2} max
     * @param {boolean} returnNew
     */
    clamp(min, max, returnNew = false) {
        let clampedX = Math.max(Math.min(this.x, max.x), min.x);
        let clampedY = Math.max(Math.min(this.y, max.y), min.y);
        if (returnNew) {
            return new Vec2(clampedX, clampedY);
        } else {
            this.set(clampedX, clampedY);

            return this;
        }
    }

    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     *
     * @param {Vec2} other
     */
    distance(other){
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
}
