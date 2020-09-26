import{EventEmitter as t}from"tiny-events";function e(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}var n=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.x=t,this.y=e}var e=t.prototype;return e.set=function(t,e){return this.x=t,this.y=e,this},e.assign=function(t){return this.x=t.x,this.y=t.y,this},e.clamp=function(e,i,n){void 0===n&&(n=!1);var o=Math.max(Math.min(this.x,i.x),e.x),s=Math.max(Math.min(this.y,i.y),e.y);return n?new t(o,s):(this.set(o,s),this)},e.distance=function(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))},i(t,[{key:"length",get:function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}}]),t}(),o=function(t){var e,o;function s(e,i){var o;return void 0===i&&(i={}),(o=t.call(this)||this).update=function(){o.shouldUpdate&&(o._raf=window.requestAnimationFrame(o.update));var t,e=Date.now()/1e3*60,i=e-o.lastUpdate;o.lastUpdate=e,o.deltaPosition.set(o.target.x-o.position.x,o.target.y-o.position.y),o.direction.set(o.deltaPosition.x>0?1:o.deltaPosition.x<0?-1:o.direction.x,o.deltaPosition.y>0?1:o.deltaPosition.y<0?-1:o.direction.y),o.velocity.set(o.deltaPosition.x/i,o.deltaPosition.y/i),o.acceleration.set(o.velocity.x/i,o.velocity.y/i),t=o.dragging?.9:o.damper,Math.abs(o.position.x-o.target.x)<=o.threshold?o.position.x=o.target.x:o.position.x+=o.deltaPosition.x*t*i,Math.abs(o.position.y-o.target.y)<=o.threshold?o.position.y=o.target.y:o.position.y+=o.deltaPosition.y*t*i,o.isMoving=o.position.distance(o.target)>0},o.onStart=function(t){var e=o.normalizeEvent(t);o.startPosition.set(e.x,e.y),o.dragging=!0,o.shouldUpdate=!0},o.onMove=function(t){var e=o.normalizeEvent(t);o.dragging&&(o.target.set(e.x,e.y).clamp(o.min,o.max),o.emit("drag")),o.emit("move"),o.shouldUpdate=!0},o.onEnd=function(){o.stoppingPosition.set(o.target.x+Math.pow(o.velocity.x,2)/(2*o.friction*9.8)*o.direction.x,o.target.y+Math.pow(o.velocity.y,2)/(2*o.friction*9.8)*o.direction.y),o.target.assign(o.stoppingPosition).clamp(o.min,o.max),o.dragging=!1},o.element=e,o.draggingThreshold=i.draggingThreshold||10,o.damper=i.damper||.2,o.damperVelocity=i.damperVelocity||.05,o.friction=i.friction||.25,o._shouldUpdate=!1,o._dragging=!1,o._isMoving=!1,o.threshold=.001,o.lastUpdate=Date.now()/1e3*60,o.min=new n(0,0),o.max=new n(e.offsetWidth,e.offsetHeight),o.startPosition=new n(0,0),o.endPosition=new n(0,0),o.deltaPosition=new n(0,0),o.deltaTarget=new n(0,0),o.stoppingPosition=new n(0,0),o.target=new n(0,0),o.position=new n(0,0),o.acceleration=new n(0,0),o.direction=new n(0,0),o.velocity=new n(0,0),o}o=t,(e=s).prototype=Object.create(o.prototype),e.prototype.constructor=e,e.__proto__=o;var a=s.prototype;return a.normalizeEvent=function(t){return t instanceof TouchEvent?{x:t.touches[0].clientX,y:t.touches[0].clientY}:t instanceof MouseEvent?{x:t.clientX,y:t.clientY}:void 0},a.attach=function(){this.element.addEventListener("touchstart",this.onStart,!1),this.element.addEventListener("touchmove",this.onMove,!1),this.element.addEventListener("touchend",this.onEnd,!1),this.element.addEventListener("mousedown",this.onStart,!1),this.element.addEventListener("mousemove",this.onMove,!1),this.element.addEventListener("mouseup",this.onEnd,!1)},a.detach=function(){this.element.removeEventListener("touchstart",this.onStart,!1),this.element.removeEventListener("touchmove",this.onMove,!1),this.element.removeEventListener("touchend",this.onEnd,!1),this.element.removeEventListener("mousedown",this.onStart,!1),this.element.removeEventListener("mousemove",this.onMove,!1),this.element.removeEventListener("mouseup",this.onEnd,!1)},i(s,[{key:"dragging",set:function(t){t&&!this.dragging&&(this._dragging=t,this.emit("dragstart")),!t&&this.dragging&&(this._dragging=t,this.emit("dragend"))},get:function(){return this._dragging}},{key:"shouldUpdate",get:function(){return this._shouldUpdate},set:function(t){t||(this._shouldUpdate=t,window.cancelAnimationFrame(this._raf)),t&&!this.shouldUpdate&&(this._shouldUpdate=t,this.update())}},{key:"isMoving",get:function(){return this._isMoving},set:function(t){t!==this.isMoving&&(t&&!this.isMoving&&this.emit("movestart"),!t&&this.isMoving&&this.emit("moveend"),this._isMoving=t)}}]),s}(t);export{o as Input};
//# sourceMappingURL=input.module.js.map
