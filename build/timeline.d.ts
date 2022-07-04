import { LitElement } from 'lit';
/**
 * Timeline
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - Children
 */
export declare class EasyTimeline extends LitElement {
    static styles: import("lit").CSSResult;
    start: number;
    end: number;
    events: {
        name: string;
        start: number;
        end: number;
    }[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'easy-timeline': EasyTimeline;
    }
}
//# sourceMappingURL=timeline.d.ts.map