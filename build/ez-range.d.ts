/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement } from 'lit';
import { ITimeElement, ITimeRangeElement } from './models';
/**
  * An example element.
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - This element has a slot
  * @csspart button - The button
  */
export declare class EzRange extends LitElement implements ITimeElement, ITimeRangeElement {
    from: number;
    to: number;
    step: number;
    start: number;
    end: number;
    constructor();
    createRenderRoot(): this;
    render(): import("lit-html").TemplateResult<1>;
    updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'ez-range': EzRange;
    }
}
//# sourceMappingURL=ez-range.d.ts.map