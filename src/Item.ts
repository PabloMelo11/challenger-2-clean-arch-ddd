export default class Item {
  private readonly DIVISOR_FACTOR = 100;

  constructor(
    readonly idItem: number,
    readonly description: string,
    readonly price: number,
    readonly height: number,
    readonly width: number,
    readonly depth: number,
    readonly weight: number
  ) {
    this.height = this.height / this.DIVISOR_FACTOR;
    this.width = this.width / this.DIVISOR_FACTOR;
    this.depth = this.depth / this.DIVISOR_FACTOR;
  }

  calculateVolume() {
    return this.height * this.width * this.depth;
  }

  calculateDensity() {
    return this.roundValue(this.weight / this.calculateVolume());
  }

  private roundValue(value: number) {
    return Math.round(value);
  }
}
