import { LitElement } from 'lit';
import { ITimelineItem } from './models';
/**
  * Timeline
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - Children
  */
export declare class EzEventTime extends LitElement implements ITimelineItem {
    start: number;
    end: number;
    content: string;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ez-event-time': EzEventTime;
    }
}
//# sourceMappingURL=ez-event-time.d.ts.map