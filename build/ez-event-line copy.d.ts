import { LitElement } from 'lit';
import { ITimeRangeElement } from './models';
/**
  * Timeline
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - Children
  */
export declare class EzEventLine extends LitElement implements ITimeRangeElement {
    start: number;
    end: number;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ez-event-line': EzEventLine;
    }
}
//# sourceMappingURL=ez-event-line%20copy.d.ts.map