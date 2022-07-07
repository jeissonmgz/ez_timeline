import {LitElement, css, TemplateResult, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {EOrientationTimeLine, ITimelineItem} from '../../models';
import {getTimelineItemStyle} from '../../utils';
import {TimelineHorizontal} from './timeline-horizontal';
import {TimelineVertical} from './timeline-vertical';

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

  @property({type: Number, reflect: true})
  semistep = 0;

  @property({type: String, reflect: true})
  borderGrid = '0.5px dotted gray';

  @property({type: String, reflect: true})
  borderSmallGrid = '0.5px dotted lightgray';

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
      top: calc(100% + 8px);
      left: 50%;
      margin-left: -60px;
    }

    .nowrap {
      position: absolute;
      width: max-content;
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
        .innerHTML="<span class='${item.noWrap
          ? 'nowrap'
          : ''}'>${item.content}</span><span class='tooltiptext'>${item.start} - ${item.end}</span>"
      ></div>
    `;
  }

  getDrawer() {
    return this.orientation === EOrientationTimeLine.horizontal
      ? new TimelineHorizontal(this)
      : new TimelineVertical(this);
  }

  override render() {
    return this.getDrawer().draw();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ez-timeline': EzTimeline;
  }
}
