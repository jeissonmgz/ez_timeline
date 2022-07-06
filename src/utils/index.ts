import {ITimeElement, ITimelineItem, ITimeLinePath} from '../models';
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

export const getTimelineItemPath = ({start, end, step}: ITimeElement) =>
  end - start + 1 + step;

export const getTimelinePathStyle = (timeElement: ITimeElement) =>
  styleMap({
    display: 'grid',
    gridTemplateColumns: '1fr '.repeat(getTimelineItemPath(timeElement)),
  });

export const getTimelineItemPosition = (start: number, value: number) =>
  Math.floor(value - start) + 1;

export const getTimelineItemStyle = (
  {start, end, background}: ITimelineItem,
  {start: begin}: ITimeElement,
  index: number,
  isCollapsed: boolean
) =>
  styleMap({
    gridRow: `${isCollapsed ? 1 : index + 1}`,
    background: background,
    gridColumn: `${getTimelineItemPosition(begin, start)} / ${
      getTimelineItemPosition(begin, end) + 1
    }`,
  });

export const getTimelinePaths = (children: HTMLCollection): ITimeLinePath[] => {
  return [...children].map((path) => {
    const pathNode = path as unknown as HTMLElement;
    return {
      collapsed: pathNode.hasAttribute('collapsed'),
      timelineItems: getTimelineItems(pathNode.children),
    };
  });
};

export const getTimeLineScale = (index: number, step: number) =>
  styleMap({
    gridRow: `1`,
    gridColumn: `${index * step + 1} / ${(index + 1) * step + 1}`,
  });
