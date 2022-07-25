import {html, TemplateResult} from 'lit';
import {ITimelineDrawer, ITimelineItem, ITimeLinePath} from '../../../models';
import {
  countCells,
  getTimelineColumnsStyle,
  getTimelinePaths,
  getTimelinePathStyle,
  getTimelineRowsStyle,
  getTimeLineScale,
} from '../../../utils';
import {EzTimeline} from '../ez-timeline';

export class TimelineHorizontalDrawer implements ITimelineDrawer {
  total = 0;
  paths = 0;
  blocks = 0;

  constructor(private timeline: EzTimeline) {}

  private titleTemplate(title: string | null): TemplateResult {
    if (!title) return html``;
    const item: ITimelineItem = {
      hideTooltip: true,
      start: this.timeline.start,
      end: this.timeline.start + this.blocks,
      content: title,
      color: 'white',
      background: 'darkgray',
      noWrap: false,
    };
    return html` ${this.timeline.itemTemplate(item, false)} `;
  }

  private pathTemplate(path: ITimeLinePath): TemplateResult {
    const titleRow = this.titleTemplate(path.title);
    if (path.collapsed) {
      this.timeline.pathsIndex++;
    }
    return html`
      ${titleRow}
      ${path.timelineItems.map(
        (item) => html` ${this.timeline.itemTemplate(item, path.collapsed)} `
      )}
    `;
  }

  private drawSmallGridTemplate() {
    let indexes: number[] = [];
    for (let i = 0; i < this.total; i++) {
      indexes = [...indexes, i];
    }
    if (this.timeline.semistep === 0) {
      return html``;
    }
    return html`
      ${[...Array(Math.floor(this.blocks / this.timeline.semistep))].map(
        (__, i) =>
          this.drawGridYTemplate(
            i,
            this.paths,
            this.blocks,
            this.timeline.semistep,
            this.timeline.borderSmallGrid
          )
      )}
    `;
  }

  private drawGridYTemplate(
    index: number,
    paths: number,
    blocks: number,
    step: number,
    border: string
  ) {
    return html`<div
      class="timeline__rows"
      style=${getTimelineColumnsStyle(
        index,
        paths,
        blocks,
        step,
        this.timeline.orientation,
        border
      )}
    ></div>`;
  }

  private drawGridXTemplate(
    index: number,
    paths: number,
    blocks: number,
    step: number,
    border: string
  ) {
    return html`<div
      class="timeline__rows"
      style=${getTimelineRowsStyle(
        index,
        paths,
        blocks,
        step,
        this.timeline.orientation,
        border
      )}
    ></div>`;
  }

  private drawGridTemplate() {
    let indexes: number[] = [];
    for (let i = 0; i < this.total; i++) {
      indexes = [...indexes, i];
    }
    if (this.timeline.borderPath === '') {
      return html``;
    }
    return html`
      ${[...Array(Math.floor(this.blocks / this.timeline.step))].map((__, i) =>
        this.drawGridYTemplate(
          i,
          this.paths,
          this.blocks,
          this.timeline.step,
          this.timeline.borderBlock
        )
      )}
      ${[...Array(this.paths)].map((__, i) =>
        this.drawGridXTemplate(
          i,
          this.paths,
          this.blocks,
          this.timeline.step,
          this.timeline.borderPath
        )
      )}
    `;
  }

  public draw() {
    const timelines = getTimelinePaths(this.timeline.children);
    let indexes: number[] = [];
    for (
      let i = this.timeline.start;
      i <= this.timeline.end;
      i += this.timeline.step
    ) {
      indexes = [...indexes, i];
    }
    const styles = getTimelinePathStyle(this.timeline, timelines);
    const {total, paths, blocks} = countCells(this.timeline, timelines);

    this.total = total;
    this.paths = paths;
    this.blocks = blocks;
    return html`
      <div class="timeline__scale" style=${styles}>
        ${this.drawSmallGridTemplate()} ${this.drawGridTemplate()}
        ${indexes.map(
          (i, index) => html`<div
            class="timeline__scale_marker"
            style=${getTimeLineScale(
              index,
              this.timeline.step,
              this.timeline.pathsIndex,
              this.timeline.orientation
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
