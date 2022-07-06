import {LitElement, html, TemplateResult, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ITimelineItem, ITimeLinePath} from '../../models';
import {
  getTimelineItemStyle,
  getTimelinePaths,
  getTimelinePathStyle,
  getTimeLineScale,
} from '../../utils';

/**
 * Timeline
 *
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

  static override styles = css`
    .tooltip {
      position: relative;
      display: inline-block;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      top: 150%;
      left: 50%;
      margin-left: -60px;
    }

    .tooltip .tooltiptext::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent black transparent;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
  `;

  itemTemplate(
    item: ITimelineItem,
    index: number,
    isCollapsed: boolean
  ): TemplateResult {
    const styles = getTimelineItemStyle(item, this, index, isCollapsed);
    return html`
      <div
        class="timeline__item tooltip"
        style=${styles}
        .innerHTML="${item.content}<span class='tooltiptext'>${item.start} - ${item.end}</span>"
      ></div>
    `;
  }

  pathTemplate(path: ITimeLinePath): TemplateResult {
    const styles = getTimelinePathStyle(this);
    return html`
      <div class="timeline__scale" style=${styles}>
        ${path.timelineItems.map(
          (item, index) => html`
            ${this.itemTemplate(item, index, path.collapsed)}
          `
        )}
      </div>
    `;
  }

  override render() {
    const timelines = getTimelinePaths(this.children);
    let indexes: number[] = [];
    for (let i = this.start; i <= this.end; i += this.step) {
      indexes = [...indexes, i];
    }
    const styles = getTimelinePathStyle(this);
    return html`
      <div class="timeline__scale" style=${styles}>
        ${indexes.map(
          (i, index) => html`<div
            class="timeline__scale_marker"
            style=${getTimeLineScale(index, this.step)}
          >
            ${i}
          </div>`
        )}
      </div>
      ${timelines.map((path) => html` ${this.pathTemplate(path)} `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ez-timeline': EzTimeline;
  }
}
