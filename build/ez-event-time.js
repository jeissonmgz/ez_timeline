var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
  * Timeline
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - Children
  */
let EzEventTime = class EzEventTime extends LitElement {
    constructor() {
        super();
        this.start = 1990;
        this.end = 2000;
        this.content = '';
    }
    render() {
        return html `
            <slot></slot>
        `;
    }
};
__decorate([
    property({ type: Number, reflect: true })
], EzEventTime.prototype, "start", void 0);
__decorate([
    property({ type: Number, reflect: true })
], EzEventTime.prototype, "end", void 0);
__decorate([
    property({ type: String, reflect: true })
], EzEventTime.prototype, "content", void 0);
EzEventTime = __decorate([
    customElement('ez-event-time')
], EzEventTime);
export { EzEventTime };
//# sourceMappingURL=ez-event-time.js.map