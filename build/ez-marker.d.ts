/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement } from 'lit';
import { ITimeElement } from './models';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class EzMarker extends LitElement implements ITimeElement {
    from: number;
    to: number;
    step: number;
    static shadowRootOptions: ShadowRootInit;
    constructor();
    createRenderRoot(): LitElement;
    render(): import("lit-html").TemplateResult<1>;
    updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'ez-marker': EzMarker;
    }
}
//# sourceMappingURL=ez-marker.d.ts.map