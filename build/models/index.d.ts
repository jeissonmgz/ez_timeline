export interface ITimeElement {
    start: number;
    end: number;
    step: number;
}
export interface ITimelineItem {
    start: number;
    end: number;
    content: string;
}
export interface ITimeLinePath {
    collapsed: boolean;
    timelineItems: ITimelineItem[];
}
//# sourceMappingURL=index.d.ts.map