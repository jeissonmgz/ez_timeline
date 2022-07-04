import {LitElement, html } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { ITimelineItem } from './models';

/**
  * Timeline
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - Children
  */
@customElement('ez-event-time')
export class EzEventTime extends LitElement implements ITimelineItem {

    @property({type: Number, reflect: true})
    start = 1990;

    @property({type: Number, reflect: true})
    end = 2000;

    @property({type: String, reflect: true})
    content = '';
    
    
    constructor() {
        super();
    }

    override render() {
        return html`
            <slot></slot>
        `;
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'ez-event-time': EzEventTime;
  }
}
