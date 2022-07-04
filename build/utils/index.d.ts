import { ITimeElement, ITimelineItem, ITimeLinePath } from "../models";
export declare const updateChildrenTimeElement: (component: ITimeElement, childNodes: NodeListOf<ChildNode>) => void;
export declare const getTimelineItems: (children: HTMLCollection) => ITimelineItem[];
export declare const getTimelineItemPath: ({ start, end, step }: ITimeElement) => number;
export declare const getTimelinePathStyle: (timeElement: ITimeElement) => import("lit-html/directive").DirectiveResult<typeof import("lit-html/directives/style-map.js").StyleMapDirective>;
export declare const getTimelineItemPosition: (start: number, step: number, value: number) => number;
export declare const getTimelineItemStyle: ({ start, end }: ITimelineItem, { start: begin, step }: ITimeElement, index: number, isCollapsed: boolean) => import("lit-html/directive").DirectiveResult<typeof import("lit-html/directives/style-map.js").StyleMapDirective>;
export declare const getTimelinePaths: (children: HTMLCollection) => ITimeLinePath[];
//# sourceMappingURL=index.d.ts.map