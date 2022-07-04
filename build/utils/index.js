import { styleMap } from 'lit-html/directives/style-map.js';
export const updateChildrenTimeElement = (component, childNodes) => {
    childNodes.forEach(node => {
        const nodeType = node;
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
export const getTimelineItems = (children) => ([...children].map(node => ({
    start: Number(node.getAttribute('start')),
    end: Number(node.getAttribute('end')),
    content: node.innerHTML
})));
export const getTimelineItemPath = ({ start, end, step }) => (end - start) / step + 1;
export const getTimelinePathStyle = (timeElement) => styleMap({
    display: 'grid',
    gridTemplateColumns: '1fr '.repeat(getTimelineItemPath(timeElement))
});
export const getTimelineItemPosition = (start, step, value) => Math.floor((value - start) / step) + 1;
export const getTimelineItemStyle = ({ start, end }, { start: begin, step }, index, isCollapsed) => styleMap({
    gridRow: `${isCollapsed ? 1 : index + 1}`,
    background: 'rgba(255,255, 0, 10%)',
    gridColumn: `${getTimelineItemPosition(begin, step, start)} / ${getTimelineItemPosition(begin, step, end) + 1}`
});
export const getTimelinePaths = (children) => {
    return [...children].map(path => {
        const pathNode = path;
        return {
            collapsed: pathNode.hasAttribute('collapsed'),
            timelineItems: getTimelineItems(pathNode.children)
        };
    });
};
//# sourceMappingURL=index.js.map