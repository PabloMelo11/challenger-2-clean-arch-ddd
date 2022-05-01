import Item from './Item';

export default class Freight {
  readonly DISTANCE_DEFAULT = 1000;
  readonly DIVISOR_FACTOR = 100;
  readonly MIN_VALUE = 10.0;
  items: Item[];

  constructor() {
    this.items = [];
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  calculateTotal() {
    const dimensionSum = this.items.reduce(
      (dimension, item) => {
        dimension.volume += item.calculateVolume();
        dimension.density += item.calculateDensity();

        return dimension;
      },
      { volume: 0, density: 0 }
    );

    const freight =
      this.DISTANCE_DEFAULT *
      dimensionSum.volume *
      (dimensionSum.density / this.DIVISOR_FACTOR);

    return freight < this.MIN_VALUE ? this.MIN_VALUE : freight;
  }
}
