import {LitElement, svg, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Map
 *
 */
@customElement('ez-map')
export class EzMap extends LitElement {
  static override styles = css`
    .invertY {
      transform: scaleY(-1);
      cursor: -webkit-grab;
      cursor: grab;
    }
  `;

  pointInit = {x: 0, y: 0};
  latitudeMax = 90;
  latitudeMin = -90;

  longitudeMax = 180;
  longitudeMin = -180;

  latitudeInit = 42.15;
  longitudeInit = 12.23;

  zoom = 8;

  @property({type: Boolean, reflect: true})
  navigate = false;

  @property({type: String, reflect: true})
  width = '100%';

  @property({type: String, reflect: true})
  height = 'auto';

  isPointerDown = false;
  viewBoxConfig = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor() {
    super();
    if (this.navigate) {
      if (window.PointerEvent) {
        this.addEventListener('pointerdown', this.onPointerDown); // Pointer is pressed
        this.addEventListener('pointerup', this.onPointerUp); // Releasing the pointer
        this.addEventListener('pointerleave', this.onPointerUp); // Pointer gets out of the SVG area
        this.addEventListener('pointermove', this.onPointerMove); // Pointer is moving
      } else {
        // Add all mouse events listeners fallback
        this.addEventListener('mousedown', this.onPointerDown); // Pressing the mouse
        this.addEventListener('mouseup', this.onPointerUp); // Releasing the mouse
        this.addEventListener('mouseleave', this.onPointerUp); // Mouse gets out of the SVG area
        this.addEventListener('mousemove', this.onPointerMove); // Mouse is moving

        // Add all touch events listeners fallback
        this.addEventListener('touchstart', this.onPointerDown); // Finger is touching the screen
        this.addEventListener('touchend', this.onPointerUp); // Finger is no longer touching the screen
        this.addEventListener('touchmove', this.onPointerMove); // Finger is moving
      }
    }
  }

  get map(): HTMLElement {
    return this.renderRoot?.querySelector('#map') as HTMLElement;
  }

  getViewBox() {
    const heightSvg = (this.latitudeMax * 2) / Math.pow(2, this.zoom);
    this.viewBoxConfig = {
      x: this.longitudeInit,
      y: this.latitudeInit - heightSvg,
      width: (this.longitudeMax * 2) / Math.pow(2, this.zoom),
      height: heightSvg,
    };
    return `${this.viewBoxConfig.x} ${this.viewBoxConfig.y} ${this.viewBoxConfig.width} ${this.viewBoxConfig.height}`;
  }

  drawPolyline(element: HTMLElement) {
    const style = element.getAttribute('style');
    const points = element.getAttribute('points');
    return svg`<polyline
      style=${style}
      points=${points}
      />`;
  }

  drawPolygon(element: HTMLElement) {
    const style = element.getAttribute('style');
    const points = element.getAttribute('points');
    return svg`<polygon
      style=${style}
      points=${points}
      />`;
  }

  drawCircle(element: HTMLElement) {
    const style = element.getAttribute('style');
    const cx = element.getAttribute('cx');
    const cy = element.getAttribute('cy');
    const r = element.getAttribute('r');
    return svg`<polygon
      style=${style}
      cx=${cx}
      cy=${cy}
      r=${r}
      />`;
  }

  drawChild(element: HTMLElement) {
    const type = element.getAttribute('type');
    if (type === 'polyline') {
      return this.drawPolyline(element);
    } else if (type === 'polygon') {
      return this.drawPolygon(element);
    } else if (type === 'circle') {
      return this.drawCircle(element);
    }
    return svg``;
  }

  drawChildren(children: HTMLCollection) {
    return [...children].map((element) => {
      return svg`${this.drawChild(element as unknown as HTMLElement)}`;
    });
  }

  override render() {
    return svg`
      <svg id="map" width=${this.width} height=${
      this.height
    } viewBox=${this.getViewBox()} preserveAspectRatio="xMaxYMax slice" class="invertY">
        ${this.drawChildren(this.children)}
      </svg>
    `;
  }

  getPointFromEvent(event: TouchEvent | MouseEvent) {
    const touchEvent = event as TouchEvent;
    // If even is triggered by a touch event, we get the position of the first finger
    if (touchEvent.targetTouches) {
      return {
        x: touchEvent.targetTouches[0].clientX,
        y: touchEvent.targetTouches[0].clientY,
      };
    } else {
      const mouseEvent = event as MouseEvent;
      return {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
      };
    }
  }

  pointerOrigin = {x: 0, y: 0};

  onPointerDown(event: TouchEvent | MouseEvent) {
    this.isPointerDown = true;
    this.pointerOrigin = this.getPointFromEvent(event);
  }

  onPointerUp() {
    this.isPointerDown = false;
  }

  // We save the original values from the

  // Function called by the event listeners when user start moving/dragging
  onPointerMove(event: TouchEvent | MouseEvent) {
    if (!this.isPointerDown) {
      return;
    }
    event.preventDefault();

    const pointerPosition = this.getPointFromEvent(event);

    // Update the viewBox variable with the distance from origin and current position
    // We don't need to take care of a ratio because this is handled in the getPointFromEvent function
    const deltaX = pointerPosition.x - this.pointerOrigin.x;
    const deltaY = pointerPosition.y - this.pointerOrigin.y;

    const factor = this.map.clientWidth / this.viewBoxConfig.width;
    this.longitudeInit += deltaX / factor;
    this.latitudeInit -= deltaY / factor;
    this.map.setAttribute('viewBox', this.getViewBox());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ez-map': EzMap;
  }
}
