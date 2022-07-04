import { LitElement, TemplateResult } from 'lit';
import { ITimelineItem, ITimeLinePath } from './models';
/**
* Timeline
*
* @fires count-changed - Indicates when the count changes
* @slot - Children
*/
export declare class EzTimeline extends LitElement {
    start: number;
    end: number;
    step: number;
    timelines: ITimelineItem[][];
    itemTemplate(item: ITimelineItem, index: number, isCollapsed: boolean): TemplateResult;
    pathTemplate(path: ITimeLinePath): TemplateResult;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ez-timeline': EzTimeline;
    }
}
//# sourceMappingURL=ez-timeline.d.ts.map