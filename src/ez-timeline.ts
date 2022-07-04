import {LitElement, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { ITimelineItem, ITimeLinePath } from './models';
import { getTimelineItemStyle, getTimelinePaths, getTimelinePathStyle } from './utils';

/**
* Timeline
*
* @fires count-changed - Indicates when the count changes
* @slot - Children
*/
@customElement('ez-timeline')
export class EzTimeline extends LitElement {

  @property({type: Number, reflect: true})
  start = 1990;

  @property({type: Number, reflect: true})
  end = 2000;

  @property({type: Number, reflect: true})
  step = 2;

  @property({type: Array})
  timelines: ITimelineItem[][] = [];

  itemTemplate(item: ITimelineItem, index: number, isCollapsed: boolean): TemplateResult {
    const styles = getTimelineItemStyle(item, this, index, isCollapsed);
    return html`
      <div class="timeline__item" style=${styles} .innerHTML="${item.content}"></div>
    `;
  }

  pathTemplate(path: ITimeLinePath): TemplateResult {
    const styles = getTimelinePathStyle(this);
    return html`
        <div class="timeline__scale" style=${styles}>
          ${path.timelineItems.map((item, index)=> html `
            ${this.itemTemplate(item, index, path.collapsed)}
          `)}
        </div>
    `;
  }

  override render() {
    const timelines = getTimelinePaths(this.children);
    let indexes: number[] = [];
    for (let i = this.start; i <= this.end; i+=this.step) {
      indexes = [...indexes, i];
    }
    const styles = getTimelinePathStyle(this);
    return html`
      <div class="timeline__scale" style=${styles}>
        ${indexes.map(i=> html `<div class="timeline__scale_marker">${i}</div>`)}
      </div>
      ${timelines.map(path=> html `
        ${this.pathTemplate(path)}
      `)}
      <button @click="${()=> {this.start = 1980}}">cambiar from</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ez-timeline': EzTimeline;
  }
}
