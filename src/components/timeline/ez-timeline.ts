import {LitElement, html, TemplateResult, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {EOrientationTimeLine, ITimelineItem, ITimeLinePath} from '../../models';
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
  @property({type: String, reflect: true})
  orientation: EOrientationTimeLine = EOrientationTimeLine.horizontal;

  @property({type: Number, reflect: true})
  start = 1990;

  @property({type: Number, reflect: true})
  end = 2000;

  @property({type: Number, reflect: true})
  step = 2;

  @property({type: Array})
  timelines: ITimelineItem[][] = [];

  pathsIndex: number = 1;

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

  itemTemplate(item: ITimelineItem, isCollapsed: boolean): TemplateResult {
    if (!isCollapsed) {
      this.pathsIndex++;
    }
    const styles = getTimelineItemStyle(item, this, this.pathsIndex);
    return html`
      <div
        class="timeline__item tooltip"
        style=${styles}
        .innerHTML="${item.content}<span class='tooltiptext'>${item.start} - ${item.end}</span>"
      ></div>
    `;
  }

  pathTemplate(path: ITimeLinePath): TemplateResult {
    if (path.collapsed) {
      this.pathsIndex++;
    } else {
      //this.pathsIndex--;
    }
    return html`
      ${path.timelineItems.map(
        (item) => html` ${this.itemTemplate(item, path.collapsed)} `
      )}
    `;
  }

  override render() {
    const timelines = getTimelinePaths(this.children);
    let indexes: number[] = [];
    for (let i = this.start; i <= this.end; i += this.step) {
      indexes = [...indexes, i];
    }
    const styles = getTimelinePathStyle(this, timelines);
    return html`
      <div class="timeline__scale" style=${styles}>
        ${indexes.map(
          (i, index) => html`<div
            class="timeline__scale_marker"
            style=${getTimeLineScale(
              index,
              this.step,
              this.pathsIndex,
              this.orientation
            )}
          >
            ${i}
          </div>`
        )}
        ${timelines.map((path) => html` ${this.pathTemplate(path)} `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ez-timeline': EzTimeline;
  }
}
