var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Timeline
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - Children
 */
let EasyTimeline = class EasyTimeline extends LitElement {
    constructor() {
        super(...arguments);
        this.start = 0;
        this.end = 30;
        this.events = [
            {
                name: 'Era 1',
                start: 1,
                end: 2
            },
            {
                name: 'Era 2',
                start: 2,
                end: 5
            },
            {
                name: 'Era 3',
                start: 6,
                end: 20
            },
            {
                name: 'Era 4',
                start: 21,
                end: 25
            }
        ];
    }
    render() {
        return html `
       <slot></slot>
       ${this.events.map(e => html `
       <div>
           ${e.name}
   </div>
       
       `)}
     `;
    }
};
EasyTimeline.styles = css `
     :host {
       display: block;
       border: solid 1px gray;
       padding: 16px;
       max-width: 800px;
     }
   `;
__decorate([
    property({ type: Number })
], EasyTimeline.prototype, "start", void 0);
__decorate([
    property({ type: Number })
], EasyTimeline.prototype, "end", void 0);
__decorate([
    property({ attribute: false })
], EasyTimeline.prototype, "events", void 0);
EasyTimeline = __decorate([
    customElement('easy-timeline')
], EasyTimeline);
export { EasyTimeline };
//# sourceMappingURL=timeline.js.map