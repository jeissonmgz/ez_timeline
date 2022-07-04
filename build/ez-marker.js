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
import { updateChildrenTimeElement } from './utils';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let EzMarker = class EzMarker extends LitElement {
    constructor() {
        super();
        const { from, to, step } = this.parentElement;
        this.from = from;
        this.to = to;
        this.step = step;
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `${this.from}
      <slot></slot>
    `;
    }
    updated() {
        updateChildrenTimeElement(this, this.childNodes);
    }
};
EzMarker.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: Number })
], EzMarker.prototype, "from", void 0);
__decorate([
    property({ type: Number })
], EzMarker.prototype, "to", void 0);
__decorate([
    property({ type: Number })
], EzMarker.prototype, "step", void 0);
EzMarker = __decorate([
    customElement('ez-marker')
], EzMarker);
export { EzMarker };
//# sourceMappingURL=ez-marker.js.map