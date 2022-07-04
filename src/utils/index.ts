import { ITimeElement, ITimelineItem, ITimeLinePath } from "../models";
import {styleMap} from 'lit-html/directives/style-map.js';

export const updateChildrenTimeElement = (component: ITimeElement, childNodes: NodeListOf<ChildNode>) => {
    childNodes.forEach(node=>{
        const nodeType = (node as unknown) as ITimeElement;
        if(nodeType.start) {
            nodeType.start = component.start;
        }
        if(nodeType.end) {
            nodeType.end = component.end;
        }
        if(nodeType.step) {
            nodeType.step = component.step;
        }
    });
}

export const getTimelineItems = (children: HTMLCollection): ITimelineItem[] => (
    [...children].map(node=>
        ({
            start: Number(node.getAttribute('start')),
            end: Number(node.getAttribute('end')),
            content: node.innerHTML
        })
    ))


export const getTimelineItemPath = ({start, end, step}: ITimeElement) => (end -start) / step + 1;

export const getTimelinePathStyle = (timeElement: ITimeElement)=> styleMap({
    display: 'grid',
    gridTemplateColumns: '1fr '.repeat(getTimelineItemPath(timeElement))
});

export const getTimelineItemPosition = (start: number, step: number, value: number) => Math.floor((value - start) / step) + 1;

export const getTimelineItemStyle = ({start, end}: ITimelineItem, {start: begin, step}: ITimeElement, index: number, isCollapsed: boolean) => styleMap({
    gridRow: `${isCollapsed? 1 : index + 1}`,
    background: 'rgba(255,255, 0, 10%)',
    gridColumn: `${getTimelineItemPosition(begin, step, start)} / ${getTimelineItemPosition(begin, step, end) + 1}`
});

export const getTimelinePaths = (children: HTMLCollection): ITimeLinePath[] => {
    return [...children].map(path=> {
        const pathNode = path as unknown as HTMLElement;
        return {
            collapsed: pathNode.hasAttribute('collapsed'),
            timelineItems: getTimelineItems(pathNode.children)
        };
    });
}