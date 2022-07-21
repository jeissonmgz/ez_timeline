import {LitElement, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

interface IRelationshipPosition {
  id: string;
  level: number;
  order: number;
  maxOrder: number;
  indexRelationship?: number;
  maxRelationship?: number;
}

interface IRelationship {
  id: string;
  higher: IRelationshipPosition;
  lower: IRelationshipPosition;
  level: number;
  children: IRelationshipPosition[];
}

interface IPerson {
  id: string;
  name: string;
  father: string;
  mother: string;
}

interface IPersonPosition extends IPerson {
  hierarchyIndex: number;
  orderIndex: number;
  orderSize: number;
  couples: string[];
  relationshipsId: Set<string>;
}

interface IGenealogyItem {
  id: string;
  name: string;
  father: string;
  mother: string;
  couples: string[];
}

/**
 * Genealogy
 *
 */
@customElement('ez-genealogy')
export class EzGenealogy extends LitElement {
  treeFamily: IGenealogyItem[][] = [];

  @property({type: String, reflect: true})
  lineStyle = 'stroke:black;stroke-width:1';

  @property({type: String, reflect: true})
  width = '1000px';

  @property({type: String, reflect: true})
  height = '900px';

  @property({type: Number, reflect: true})
  widthItem = 150;

  @property({type: Number, reflect: true})
  heightItem = 30;

  spanY = 0; //(spanItemY * 3) + (spanRelationships * 2)

  @property({type: Number, reflect: true})
  spanItemY = 5; //x3 (arriba, medio, bajo), total

  @property({type: Number, reflect: true})
  spanRelationships = 15; //x2 (arriba, abajo)

  @property({type: Number, reflect: true})
  spanX = 30;

  @property({type: Number, reflect: true})
  spanItemX = 50; // total a usar = 150 - (50 * 2) = 50;

  maxOrder = 0;

  @property({type: Number, reflect: true})
  px = 20;

  drawNode(person: IPersonPosition) {
    const deltaWidth = this.maxOrder - person.orderSize;
    const widthInit = ((this.spanX + this.widthItem) * deltaWidth) / 2;
    return svg`
    <rect
        x=${widthInit + (this.spanX + this.widthItem) * person.orderIndex}
        y=${(this.spanY + this.heightItem) * (person.hierarchyIndex + 1)}
        width=${this.widthItem}
        height=${this.heightItem}
        fill="black"
    />
    <text
        text-anchor="middle"
        dominant-baseline="middle"
        fill="white"
        x=${
          widthInit +
          (this.spanX + this.widthItem) * person.orderIndex +
          this.widthItem / 2
        }
        y=${
          (this.spanY + this.heightItem) * (person.hierarchyIndex + 1) +
          this.heightItem / 2
        }
    >
    ${person.name}
    </text>
    `;
  }

  drawChildren(relationship: IRelationship, x: number, y: number) {
    const childrenMiddlePoints = relationship.children.map((person) => {
      const deltaWidth = this.maxOrder - person.maxOrder;
      const widthInit = ((this.spanX + this.widthItem) * deltaWidth) / 2;
      return {
        x:
          widthInit +
          (this.spanX + this.widthItem) * person.order +
          this.widthItem / 2,
        y: (this.spanY + this.heightItem) * (person.level + 1),
      };
    });
    const pointsX = [...childrenMiddlePoints.map((point) => point.x), x];
    const maxValue = pointsX.reduce(
      (actual, newValue) => Math.max(actual, newValue),
      -Infinity
    );
    const minValue = pointsX.reduce(
      (actual, newValue) => Math.min(actual, newValue),
      Infinity
    );
    return svg`
        ${childrenMiddlePoints.map(
          (point) =>
            svg`


<circle
            cx=${maxValue}
            cy=${y}
            r="1.5"
            style=${this.lineStyle}
        />


<line
x1=${maxValue}
y1=${y}
x2=${minValue}
y2=${y}
            style=${this.lineStyle}
/>


<circle
            cx=${point.x}
            cy=${y}
            r="1.5"
            style=${this.lineStyle}
        />
<line
x1=${point.x}
y1=${y}
x2=${point.x}
y2=${point.y}
style=${this.lineStyle}
/>

`
        )}
    `;
  }

  drawConnectorChildren(
    relationship: IRelationship,
    middleX: number,
    relationshipsY: number,
    childrenY: number
  ) {
    if (relationship.children.length === 0) return;
    return svg`
    <line
    x1=${middleX}
    x2=${middleX}
    y1=${relationshipsY}
    y2=${childrenY}
    style=${this.lineStyle}
/>

<circle
    cx=${middleX}
    cy=${relationshipsY}
    r="1.5"
    style=${this.lineStyle}
/>`;
  }

  drawRelationshipsWithCouple(
    relationship: IRelationship,
    relationshipNumber: number,
    relationshipTotal: number,
    treeFamilyFlat: Map<string, IPersonPosition>
  ) {
    const deltaWidthHigher = this.maxOrder - relationship.higher.maxOrder;
    const widthInitHigher =
      ((this.spanX + this.widthItem) * deltaWidthHigher) / 2;

    const higherComplete = treeFamilyFlat.get(
      relationship.higher.id
    ) as IPersonPosition;
    const higherRelationshipsTotal = higherComplete.relationshipsId.size;
    const higherRelationshipsActual = [
      ...higherComplete.relationshipsId,
    ].indexOf(relationship.id);
    const initialX =
      widthInitHigher +
      (this.spanX + this.widthItem) * relationship.higher.order;
    const x =
      higherRelationshipsTotal === 1
        ? initialX + this.widthItem / 2
        : initialX +
          this.px +
          ((this.widthItem - this.px * 2) * higherRelationshipsActual) /
            (higherRelationshipsTotal - 1);
    const y =
      (this.spanY + this.heightItem) * (relationship.higher.level + 1) +
      this.heightItem;
    const deltaY = Math.round(
      (this.spanRelationships * relationshipNumber) / relationshipTotal
    );
    const heightHigher = relationship.level - relationship.higher.level;

    const deltaWidthLower = this.maxOrder - relationship.lower.maxOrder;
    const widthInitLower =
      ((this.spanX + this.widthItem) * deltaWidthLower) / 2;
    const lowerComplete = treeFamilyFlat.get(
      relationship.lower.id
    ) as IPersonPosition;
    const lowerRelationshipsTotal = lowerComplete.relationshipsId.size;
    const lowerRelationshipsActual = [...lowerComplete.relationshipsId].indexOf(
      relationship.id
    );
    const initialLowerX =
      widthInitLower + (this.spanX + this.widthItem) * relationship.lower.order;
    const xLower =
      lowerRelationshipsTotal === 1
        ? initialLowerX + this.widthItem / 2
        : initialLowerX +
          this.px +
          ((this.widthItem - this.px * 2) * lowerRelationshipsActual) /
            (lowerRelationshipsTotal - 1);
    const yLower =
      (this.spanY + this.heightItem) * (relationship.lower.level + 1) +
      this.heightItem;

    const middleX = (x + xLower) / 2;
    const relationshipsY =
      y +
      heightHigher * (this.spanY + this.heightItem) +
      this.spanItemY +
      deltaY;
    const childrenY = relationshipsY + this.spanItemY + this.spanRelationships;

    return svg`
        <line
            x1=${x}
            x2=${x}
            y1=${y}
            y2=${relationshipsY}
            style=${this.lineStyle}
        />
        <circle
            cx=${x}
            cy=${relationshipsY}
            r="1.5"
            style=${this.lineStyle}
        />
        <circle
            cx=${xLower}
            cy=${relationshipsY}
            r="1.5"
            style=${this.lineStyle}
        />
        <line
            x1=${xLower}
            x2=${xLower}
            y1=${yLower}
            y2=${relationshipsY}
            style=${this.lineStyle}
        />
        <line
            x1=${x}
            x2=${xLower}
            y1=${relationshipsY}
            y2=${relationshipsY}
            style=${this.lineStyle}
        />
        ${this.drawConnectorChildren(
          relationship,
          middleX,
          relationshipsY,
          childrenY
        )}
        ${this.drawChildren(relationship, middleX, childrenY)}
    `;
  }

  drawRelationshipsWithoutCouple(
    relationship: IRelationship,
    relationshipNumber: number,
    relationshipTotal: number,
    treeFamilyFlat: Map<string, IPersonPosition>
  ) {
    const deltaWidthHigher = this.maxOrder - relationship.higher.maxOrder;
    const widthInitHigher =
      ((this.spanX + this.widthItem) * deltaWidthHigher) / 2;
    const higherComplete = treeFamilyFlat.get(
      relationship.higher.id
    ) as IPersonPosition;
    const higherRelationshipsTotal = higherComplete.relationshipsId.size;
    const higherRelationshipsActual = [
      ...higherComplete.relationshipsId,
    ].indexOf(relationship.id);
    const initialX =
      widthInitHigher +
      (this.spanX + this.widthItem) * relationship.higher.order;
    const x =
      higherRelationshipsTotal === 1
        ? initialX + this.widthItem / 2
        : initialX +
          this.px +
          ((this.widthItem - this.px * 2) * higherRelationshipsActual) /
            (higherRelationshipsTotal - 1);
    const y =
      (this.spanY + this.heightItem) * (relationship.higher.level + 1) +
      this.heightItem;
    const deltaY = Math.round(
      (this.spanRelationships * relationshipNumber) / relationshipTotal
    );
    const heightHigher = relationship.level - relationship.higher.level;

    const relationshipsY =
      y +
      heightHigher * (this.spanY + this.heightItem) +
      this.spanItemY +
      deltaY;
    const childrenY = relationshipsY + this.spanItemY + this.spanRelationships;

    return svg`
        <line
            x1=${x}
            x2=${x}
            y1=${y}
            y2=${childrenY}
            style=${this.lineStyle}
        />
        ${this.drawChildren(relationship, x, childrenY)}
    `;
  }

  drawRelationships(
    relationship: IRelationship,
    relationshipNumber: number,
    relationshipTotal: number,
    treeFamilyFlat: Map<string, IPersonPosition>
  ) {
    if (relationship.lower) {
      return this.drawRelationshipsWithCouple(
        relationship,
        relationshipNumber,
        relationshipTotal,
        treeFamilyFlat
      );
    }
    return this.drawRelationshipsWithoutCouple(
      relationship,
      relationshipNumber,
      relationshipTotal,
      treeFamilyFlat
    );
  }

  getGenealogyItem(children: HTMLCollection): IGenealogyItem[] {
    return [...children].map((node) => {
      return {
        id: node.getAttribute('id'),
        name: node.getAttribute('name'),
        father: node.getAttribute('father'),
        mother: node.getAttribute('mother'),
        couples: node.getAttribute('couples')
          ? (node.getAttribute('couples') as string).split(',')
          : [],
      } as IGenealogyItem;
    });
  }

  getGenealogy(children: HTMLCollection): IGenealogyItem[][] {
    return [...children].map((path) => {
      const pathNode = path as unknown as HTMLElement;
      return this.getGenealogyItem(pathNode.children);
    });
  }

  override render() {
    this.spanY = this.spanItemY * 3 + this.spanRelationships * 2;
    this.treeFamily = this.getGenealogy(this.children) as IGenealogyItem[][];
    const treeFamilyFlat = new Map<string, IPersonPosition>();
    this.treeFamily.forEach((hierarchy, hierarchyIndex) => {
      const orderSize = hierarchy.length;
      hierarchy.forEach((item, orderIndex) => {
        treeFamilyFlat.set(item.id, {
          ...item,
          hierarchyIndex,
          orderIndex,
          orderSize,
          relationshipsId: new Set<string>(),
        });
      });
    });

    const relationships = new Map<string, IRelationship>();
    treeFamilyFlat.forEach((person) => {
      if (person.mother !== '' && person.father === '') {
        const mother = treeFamilyFlat.get(person.mother) as IPersonPosition;

        const motherPosition = {
          id: mother.id,
          level: mother.hierarchyIndex,
          order: mother.orderIndex,
          maxOrder: mother.orderSize,
          indexRelationship: 0,
          maxRelationship: 1,
        } as IRelationshipPosition;

        const childPosition = {
          id: person.id,
          level: person.hierarchyIndex,
          order: person.orderIndex,
          maxOrder: person.orderSize,
        } as IRelationshipPosition;

        let higherElement = motherPosition;
        const idRelationship = `${higherElement.id}->${higherElement.id}`;

        mother.relationshipsId.add(idRelationship);
        motherPosition.indexRelationship = [...mother.relationshipsId].indexOf(
          idRelationship
        );
        higherElement = motherPosition;

        let relationship = relationships.get(idRelationship);
        if (!relationship) {
          relationship = {
            id: idRelationship,
            higher: higherElement,
            level: higherElement.level,
            children: [childPosition],
          } as IRelationship;
        } else {
          const {children} = relationship;
          relationship.children = [...children, childPosition];
        }
        relationships.set(idRelationship, relationship);
      }

      if (person.mother === '' && person.father !== '') {
        const father = treeFamilyFlat.get(person.father) as IPersonPosition;
        const fatherPosition = {
          id: father.id,
          level: father.hierarchyIndex,
          order: father.orderIndex,
          maxOrder: father.orderSize,
          indexRelationship: 0,
          maxRelationship: 1,
        } as IRelationshipPosition;
        const childPosition = {
          id: person.id,
          level: person.hierarchyIndex,
          order: person.orderIndex,
          maxOrder: person.orderSize,
        } as IRelationshipPosition;

        let higherElement = fatherPosition;
        const idRelationship = `${higherElement.id}->${higherElement.id}`;

        father.relationshipsId.add(idRelationship);
        fatherPosition.indexRelationship = [...father.relationshipsId].indexOf(
          idRelationship
        );
        higherElement = fatherPosition;

        let relationship = relationships.get(idRelationship);
        if (!relationship) {
          relationship = {
            id: idRelationship,
            higher: higherElement,
            level: higherElement.level,
            children: [childPosition],
          } as IRelationship;
        } else {
          const {children} = relationship;
          relationship.children = [...children, childPosition];
        }
        relationships.set(idRelationship, relationship);
      }

      if (person.couples.length > 0) {
        const couple1 = person;
        person.couples.forEach((couple2Id) => {
          const couple2 = treeFamilyFlat.get(couple2Id) as IPersonPosition;
          const couple1IsHigher =
            couple1.hierarchyIndex < couple2.hierarchyIndex ||
            (couple1.hierarchyIndex === couple2.hierarchyIndex &&
              couple1.orderIndex < couple2.orderIndex);

          const couple1Position = {
            id: couple1.id,
            level: couple1.hierarchyIndex,
            order: couple1.orderIndex,
            maxOrder: couple1.orderSize,
            indexRelationship: 0,
            maxRelationship: 1,
          } as IRelationshipPosition;
          const couple2Position = {
            id: couple2.id,
            level: couple2.hierarchyIndex,
            order: couple2.orderIndex,
            maxOrder: couple2.orderSize,
            indexRelationship: 0,
            maxRelationship: 1,
          } as IRelationshipPosition;

          let higherElement = couple1IsHigher
            ? couple1Position
            : couple2Position;
          let lowerElement = !couple1IsHigher
            ? couple1Position
            : couple2Position;
          const idRelationship = `${higherElement.id}->${lowerElement.id}`;

          couple1.relationshipsId.add(idRelationship);
          couple2.relationshipsId.add(idRelationship);
          couple1Position.indexRelationship = [
            ...couple1.relationshipsId,
          ].indexOf(idRelationship);
          couple2Position.indexRelationship = [
            ...couple2.relationshipsId,
          ].indexOf(idRelationship);
          higherElement = couple1IsHigher ? couple1Position : couple2Position;
          lowerElement = !couple1IsHigher ? couple1Position : couple2Position;

          let relationship = relationships.get(idRelationship);
          if (!relationship) {
            relationship = {
              id: idRelationship,
              higher: higherElement,
              lower: lowerElement,
              level: lowerElement.level,
              children: [],
            } as IRelationship;
          } else {
            const {children} = relationship;
            relationship.children = [...children];
          }
          relationships.set(idRelationship, relationship);
        });
      }

      if (person.mother !== '' && person.father !== '') {
        const father = treeFamilyFlat.get(person.father) as IPersonPosition;
        const mother = treeFamilyFlat.get(person.mother) as IPersonPosition;
        const fatherIsHigher =
          father.hierarchyIndex < mother.hierarchyIndex ||
          (father.hierarchyIndex === mother.hierarchyIndex &&
            father.orderIndex < mother.orderIndex);

        const fatherPosition = {
          id: father.id,
          level: father.hierarchyIndex,
          order: father.orderIndex,
          maxOrder: father.orderSize,
          indexRelationship: 0,
          maxRelationship: 1,
        } as IRelationshipPosition;
        const motherPosition = {
          id: mother.id,
          level: mother.hierarchyIndex,
          order: mother.orderIndex,
          maxOrder: mother.orderSize,
          indexRelationship: 0,
          maxRelationship: 1,
        } as IRelationshipPosition;

        const childPosition = {
          id: person.id,
          level: person.hierarchyIndex,
          order: person.orderIndex,
          maxOrder: person.orderSize,
        } as IRelationshipPosition;

        let higherElement = fatherIsHigher ? fatherPosition : motherPosition;
        let lowerElement = !fatherIsHigher ? fatherPosition : motherPosition;
        const idRelationship = `${higherElement.id}->${lowerElement.id}`;

        father.relationshipsId.add(idRelationship);
        mother.relationshipsId.add(idRelationship);
        fatherPosition.indexRelationship = [...father.relationshipsId].indexOf(
          idRelationship
        );
        motherPosition.indexRelationship = [...mother.relationshipsId].indexOf(
          idRelationship
        );
        higherElement = fatherIsHigher ? fatherPosition : motherPosition;
        lowerElement = !fatherIsHigher ? fatherPosition : motherPosition;

        let relationship = relationships.get(idRelationship);
        if (!relationship) {
          relationship = {
            id: idRelationship,
            higher: higherElement,
            lower: lowerElement,
            level: lowerElement.level,
            children: [childPosition],
          } as IRelationship;
        } else {
          const {children} = relationship;
          relationship.children = [...children, childPosition];
        }
        relationships.set(idRelationship, relationship);
      }
    });

    let relationshipsByLevel: IRelationship[][] = [];
    relationships.forEach((relationship) => {
      let relationshipsByLevelItem: IRelationship[] =
        relationshipsByLevel[relationship.level];
      if (!relationshipsByLevelItem) {
        relationshipsByLevelItem = [];
      }
      relationshipsByLevel[relationship.level] = [
        ...relationshipsByLevelItem,
        {...relationship},
      ];
    });
    this.maxOrder = this.treeFamily.reduce(
      (actual, order) => (order.length > actual ? order.length : actual),
      0
    );
    return svg`
    <svg width=${this.width} height=${this.height}>
    ${relationshipsByLevel.map((relationships) =>
      relationships.map((relationship, relationshipNumber) =>
        this.drawRelationships(
          relationship,
          relationshipNumber,
          relationships.length,
          treeFamilyFlat
        )
      )
    )}
${[...treeFamilyFlat.values()].map((person) => this.drawNode(person))}
</svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ez-genealogy': EzGenealogy;
  }
}
