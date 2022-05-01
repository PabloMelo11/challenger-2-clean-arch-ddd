export default class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expirationDate: Date
  ) {}

  calculateDiscount(total: number) {
    return (total * this.percentage) / 100;
  }

  isNotExpiration(currentDate: Date): boolean {
    const timestampCurrentDate = currentDate.getDate();
    const timestampExpirationDate = this.expirationDate.getDate();

    if (timestampCurrentDate > timestampExpirationDate) {
      throw new Error('Cupom Expirado');
    }

    return true;
  }
}
