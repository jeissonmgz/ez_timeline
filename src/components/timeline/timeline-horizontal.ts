import {html, TemplateResult} from 'lit';
import {ITimelineDrawer, ITimeLinePath} from '../../models';
import {
  countCells,
  getTimelineColumnsStyle,
  getTimelinePaths,
  getTimelinePathStyle,
  getTimelineRowsStyle,
  getTimeLineScale,
} from '../../utils';
import {EzTimeline} from './ez-timeline';

export class TimelineHorizontal implements ITimelineDrawer {
  constructor(private timeline: EzTimeline) {}

  private pathTemplate(path: ITimeLinePath): TemplateResult {
    if (path.collapsed) {
      this.timeline.pathsIndex++;
    }
    return html`
      ${path.timelineItems.map(
        (item) => html` ${this.timeline.itemTemplate(item, path.collapsed)} `
      )}
    `;
  }

  private drawSmallGridTemplate(timelines: ITimeLinePath[]) {
    const {total, paths, blocks} = countCells(this.timeline, timelines);
    let indexes: number[] = [];
    for (let i = 0; i < total; i++) {
      indexes = [...indexes, i];
    }
    if (this.timeline.semistep === 0) {
      return html``;
    }
    return html`
      ${[...Array(Math.floor(blocks / this.timeline.semistep))].map((__, i) =>
        this.drawGridYTemplate(
          i,
          paths,
          blocks,
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

  private drawGridTemplate(timelines: ITimeLinePath[]) {
    const {total, paths, blocks} = countCells(this.timeline, timelines);
    let indexes: number[] = [];
    for (let i = 0; i < total; i++) {
      indexes = [...indexes, i];
    }
    if (this.timeline.borderGrid === '') {
      return html``;
    }
    return html`
      ${[...Array(Math.floor(blocks / this.timeline.step))].map((__, i) =>
        this.drawGridYTemplate(
          i,
          paths,
          blocks,
          this.timeline.step,
          this.timeline.borderGrid
        )
      )}
      ${[...Array(paths)].map((__, i) =>
        this.drawGridXTemplate(
          i,
          paths,
          blocks,
          this.timeline.step,
          this.timeline.borderGrid
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
    return html`
      <div class="timeline__scale" style=${styles}>
        ${this.drawSmallGridTemplate(timelines)}
        ${this.drawGridTemplate(timelines)}
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
