import {Input} from "../../src/index";

class Drag {
    constructor() {
        this.input = new Input(document.querySelector("main .drag-container"), {dragOnly: true})
        this.dragElement = document.querySelector("main .drag-element");
        this.translateX = 0;
        this.input.attach();
        this.render();
    }

    render = () => {
        window.requestAnimationFrame(this.render);
        if(this.input.dragging){
            this.translateX += Math.round(this.input.velocity.x);
        } else {
            this.translateX += Math.round(this.input.smoothedVelocity.x);
        }
        this.dragElement.style.transform = `translate3d(${this.translateX}px, 0, 0)`;
    }

    ready() {

    }
}

new Drag();
