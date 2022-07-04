import {LitElement, html } from 'lit';
import {customElement} from 'lit/decorators.js';

/**
  * Timeline
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - Children
  */
@customElement('ez-event-line')
export class EzEventLine extends LitElement {
    
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
    'ez-event-line': EzEventLine;
  }
}
