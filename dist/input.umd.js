!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("tiny-events")):"function"==typeof define&&define.amd?define(["exports","tiny-events"],e):e((t=t||self).input={},t.tinyEvents)}(this,function(t,e){function i(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function n(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}var o=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.x=t,this.y=e}var e=t.prototype;return e.set=function(t,e){return this.x=t,this.y=e,this},e.assign=function(t){return this.x=t.x,this.y=t.y,this},e.clamp=function(e,i,n){void 0===n&&(n=!1);var o=Math.max(Math.min(this.x,i.x),e.x),s=Math.max(Math.min(this.y,i.y),e.y);return n?new t(o,s):(this.set(o,s),this)},e.distance=function(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))},n(t,[{key:"length",get:function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}}]),t}();t.Input=function(t){var e,i;function s(e,i){var n;return void 0===i&&(i={}),(n=t.call(this)||this).update=function(){n.shouldUpdate&&(n._raf=window.requestAnimationFrame(n.update));var t,e=Date.now()/1e3*60,i=e-n.lastUpdate;n.lastUpdate=e,n.deltaPosition.set(n.target.x-n.position.x,n.target.y-n.position.y),n.direction.set(n.deltaPosition.x>0?1:n.deltaPosition.x<0?-1:n.direction.x,n.deltaPosition.y>0?1:n.deltaPosition.y<0?-1:n.direction.y),n.velocity.set(n.deltaPosition.x/i,n.deltaPosition.y/i),n.acceleration.set(n.velocity.x/i,n.velocity.y/i),t=n.dragging?.9:n.damper,Math.abs(n.position.x-n.target.x)<=n.threshold?n.position.x=n.target.x:n.position.x+=n.deltaPosition.x*t*i,Math.abs(n.position.y-n.target.y)<=n.threshold?n.position.y=n.target.y:n.position.y+=n.deltaPosition.y*t*i,n.isMoving=n.position.distance(n.target)>0},n.onStart=function(t){var e=n.normalizeEvent(t);n.startPosition.set(e.x,e.y),n.dragging=!0,n.shouldUpdate=!0},n.onMove=function(t){var e=n.normalizeEvent(t);n.dragging&&(n.target.set(e.x,e.y).clamp(n.min,n.max),n.emit("drag")),n.emit("move"),n.shouldUpdate=!0},n.onEnd=function(){n.stoppingPosition.set(n.target.x+Math.pow(n.velocity.x,2)/(2*n.friction*9.8)*n.direction.x,n.target.y+Math.pow(n.velocity.y,2)/(2*n.friction*9.8)*n.direction.y),n.target.assign(n.stoppingPosition).clamp(n.min,n.max),n.dragging=!1},n.element=e,n.draggingThreshold=i.draggingThreshold||10,n.damper=i.damper||.2,n.damperVelocity=i.damperVelocity||.05,n.friction=i.friction||.25,n._shouldUpdate=!1,n._dragging=!1,n._isMoving=!1,n.threshold=.001,n.lastUpdate=Date.now()/1e3*60,n.min=new o(0,0),n.max=new o(e.offsetWidth,e.offsetHeight),n.startPosition=new o(0,0),n.endPosition=new o(0,0),n.deltaPosition=new o(0,0),n.deltaTarget=new o(0,0),n.stoppingPosition=new o(0,0),n.target=new o(0,0),n.position=new o(0,0),n.acceleration=new o(0,0),n.direction=new o(0,0),n.velocity=new o(0,0),n}i=t,(e=s).prototype=Object.create(i.prototype),e.prototype.constructor=e,e.__proto__=i;var r=s.prototype;return r.normalizeEvent=function(t){return t instanceof TouchEvent?{x:t.touches[0].clientX,y:t.touches[0].clientY}:t instanceof MouseEvent?{x:t.clientX,y:t.clientY}:void 0},r.attach=function(){this.element.addEventListener("touchstart",this.onStart,!1),this.element.addEventListener("touchmove",this.onMove,!1),this.element.addEventListener("touchend",this.onEnd,!1),this.element.addEventListener("mousedown",this.onStart,!1),this.element.addEventListener("mousemove",this.onMove,!1),this.element.addEventListener("mouseup",this.onEnd,!1)},r.detach=function(){this.element.removeEventListener("touchstart",this.onStart,!1),this.element.removeEventListener("touchmove",this.onMove,!1),this.element.removeEventListener("touchend",this.onEnd,!1),this.element.removeEventListener("mousedown",this.onStart,!1),this.element.removeEventListener("mousemove",this.onMove,!1),this.element.removeEventListener("mouseup",this.onEnd,!1)},n(s,[{key:"dragging",set:function(t){t&&!this.dragging&&(this._dragging=t,this.emit("dragstart")),!t&&this.dragging&&(this._dragging=t,this.emit("dragend"))},get:function(){return this._dragging}},{key:"shouldUpdate",get:function(){return this._shouldUpdate},set:function(t){t||(this._shouldUpdate=t,window.cancelAnimationFrame(this._raf)),t&&!this.shouldUpdate&&(this._shouldUpdate=t,this.update())}},{key:"isMoving",get:function(){return this._isMoving},set:function(t){t!==this.isMoving&&(t&&!this.isMoving&&this.emit("movestart"),!t&&this.isMoving&&this.emit("moveend"),this._isMoving=t)}}]),s}(e.EventEmitter)});
//# sourceMappingURL=input.umd.js.map