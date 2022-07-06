import {
  EOrientationTimeLine,
  ITimeElement,
  ITimelineItem,
  ITimeLinePath,
} from '../models';
import {styleMap} from 'lit-html/directives/style-map.js';

export const updateChildrenTimeElement = (
  component: ITimeElement,
  childNodes: NodeListOf<ChildNode>
) => {
  childNodes.forEach((node) => {
    const nodeType = node as unknown as ITimeElement;
    if (nodeType.start) {
      nodeType.start = component.start;
    }
    if (nodeType.end) {
      nodeType.end = component.end;
    }
    if (nodeType.step) {
      nodeType.step = component.step;
    }
  });
};

export const getTimelineItems = (children: HTMLCollection): ITimelineItem[] =>
  [...children].map((node) => {
    const background = node.getAttribute('background');
    return {
      start: Number(node.getAttribute('start')),
      end: Number(node.getAttribute('end')),
      background: background ? background : 'gray',
      content: node.innerHTML,
    };
  });

export const countCells = (
  timeline: ITimeElement,
  timelines: ITimeLinePath[]
) => {
  const blocks =
    timeline.orientation === EOrientationTimeLine.horizontal
      ? countBlocks(timeline) + timeline.step
      : countBlocks(timeline);
  const paths = countPaths(timelines);
  const total = blocks * paths;
  return {blocks, paths, total};
};

export const countBlocks = ({start, end}: ITimeElement) => end - start + 1;

export const countPaths = (timelines: ITimeLinePath[]) => {
  return timelines.reduce(
    (total, path) => total + (path.collapsed ? 1 : path.timelineItems.length),
    1
  );
};

export const getTimelinePathStyle = (
  timeElement: ITimeElement,
  timelines: ITimeLinePath[]
) =>
  styleMap({
    display: 'grid',
    gridTemplateColumns: '1fr '.repeat(
      timeElement.orientation === EOrientationTimeLine.horizontal
        ? countBlocks(timeElement) + timeElement.step
        : countPaths(timelines)
    ),
  });

export const getTimelineItemPosition = (start: number, value: number) =>
  Math.floor(value - start) + 1;

export const getTimelineItemStyle = (
  {start, end, background}: ITimelineItem,
  {start: begin, orientation}: ITimeElement,
  pathsIndex: number
) => {
  const block = `${getTimelineItemPosition(begin, start)} / ${
    getTimelineItemPosition(begin, end) + 1
  }`;
  const path = `${pathsIndex}`;
  return styleMap(
    orientation === EOrientationTimeLine.horizontal
      ? {
          gridRow: path,
          background: background,
          gridColumn: block,
        }
      : {
          gridColumn: path,
          background: background,
          gridRow: block,
        }
  );
};

export const getTimelinePaths = (children: HTMLCollection): ITimeLinePath[] => {
  return [...children].map((path) => {
    const pathNode = path as unknown as HTMLElement;
    return {
      collapsed: pathNode.hasAttribute('collapsed'),
      timelineItems: getTimelineItems(pathNode.children),
    };
  });
};

export const getTimeLineScale = (
  index: number,
  step: number,
  pathsIndex: number,
  orientation: EOrientationTimeLine
) => {
  const block = `${index * step + 1} / ${(index + 1) * step + 1}`;
  const path = `${pathsIndex}`;
  return styleMap(
    orientation === EOrientationTimeLine.horizontal
      ? {
          gridRow: path,
          gridColumn: block,
        }
      : {
          gridRow: block,
          gridColumn: path,
        }
  );
};

export const getTimelineCellStyle = (
  total: number,
  paths: number,
  blocks: number,
  orientation: EOrientationTimeLine,
  border: string
) => {
  const styleDefault = {
    width: '100%',
    height: '100%',
    border: `${border}`,
  };
  return styleMap(
    orientation === EOrientationTimeLine.horizontal
      ? {
          ...styleDefault,
          gridColumn: `${(total % blocks) + 1}`,
          gridRow: `${Math.floor(total / blocks) + 1}`,
        }
      : {
          ...styleDefault,
          gridColumn: `${(total % paths) + 1}`,
          gridRow: `${Math.floor(total / paths) + 1}`,
        }
  );
};
