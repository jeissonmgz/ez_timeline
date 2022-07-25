export interface ITimeElement {
  start: number;
  end: number;
  step: number;
  orientation: EOrientationTimeLine;
}

export interface ITimelineDrawer {
  draw(): void;
}

export interface ITimelineItem {
  start: number;
  end: number;
  content: string;
  background: string;
  color: string;
  noWrap: boolean;
  hideTooltip: boolean;
}

export interface ITimeLinePath {
  title: string | null;
  collapsed: boolean;
  timelineItems: ITimelineItem[];
}

export enum EOrientationTimeLine {
  vertical = 'vertical',
  horizontal = 'horizontal',
}
