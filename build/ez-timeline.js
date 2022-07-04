var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getTimelineItemStyle, getTimelinePaths, getTimelinePathStyle } from './utils';
/**
* Timeline
*
* @fires count-changed - Indicates when the count changes
* @slot - Children
*/
let EzTimeline = class EzTimeline extends LitElement {
    constructor() {
        super(...arguments);
        this.start = 1990;
        this.end = 2000;
        this.step = 2;
        this.timelines = [];
    }
    itemTemplate(item, index, isCollapsed) {
        const styles = getTimelineItemStyle(item, this, index, isCollapsed);
        return html `
      <div class="timeline__item" style=${styles} .innerHTML="${item.content}"></div>
    `;
    }
    pathTemplate(path) {
        const styles = getTimelinePathStyle(this);
        return html `
        <div class="timeline__scale" style=${styles}>
          ${path.timelineItems.map((item, index) => html `
            ${this.itemTemplate(item, index, path.collapsed)}
          `)}
        </div>
    `;
    }
    render() {
        const timelines = getTimelinePaths(this.children);
        let indexes = [];
        for (let i = this.start; i <= this.end; i += this.step) {
            indexes = [...indexes, i];
        }
        const styles = getTimelinePathStyle(this);
        return html `
      <div class="timeline__scale" style=${styles}>
        ${indexes.map(i => html `<div class="timeline__scale_marker">${i}</div>`)}
      </div>
      ${timelines.map(path => html `
        ${this.pathTemplate(path)}
      `)}
      <button @click="${() => { this.start = 1980; }}">cambiar from</button>
    `;
    }
};
__decorate([
    property({ type: Number, reflect: true })
], EzTimeline.prototype, "start", void 0);
__decorate([
    property({ type: Number, reflect: true })
], EzTimeline.prototype, "end", void 0);
__decorate([
    property({ type: Number, reflect: true })
], EzTimeline.prototype, "step", void 0);
__decorate([
    property({ type: Array })
], EzTimeline.prototype, "timelines", void 0);
EzTimeline = __decorate([
    customElement('ez-timeline')
], EzTimeline);
export { EzTimeline };
//# sourceMappingURL=ez-timeline.js.map