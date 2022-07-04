/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getGridCellRangeStyle, updateChildrenTimeElement } from './utils';
/**
  * An example element.
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - This element has a slot
  * @csspart button - The button
  */
let EzRange = class EzRange extends LitElement {
    constructor() {
        super();
        this.start = 0;
        this.end = 0;
        const { from, to, step } = this.parentElement;
        this.from = from;
        this.to = to;
        this.step = step;
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const styles = getGridCellRangeStyle(this, this);
        return html `
      <div class="timeline__range" style=${styles}>
        <slot></slot>
      </div>
    `;
    }
    updated() {
        updateChildrenTimeElement(this, this.childNodes);
    }
};
__decorate([
    property({ type: Number })
], EzRange.prototype, "from", void 0);
__decorate([
    property({ type: Number })
], EzRange.prototype, "to", void 0);
__decorate([
    property({ type: Number })
], EzRange.prototype, "step", void 0);
__decorate([
    property({ type: Number })
], EzRange.prototype, "start", void 0);
__decorate([
    property({ type: Number })
], EzRange.prototype, "end", void 0);
EzRange = __decorate([
    customElement('ez-range')
], EzRange);
export { EzRange };
//# sourceMappingURL=ez-range.js.map