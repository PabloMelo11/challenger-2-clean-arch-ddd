import Coupon from './Coupon';
import Cpf from './Cpf';
import Item from './Item';
import OrderItem from './OrderItem';
import Freight from './Freight';

export default class Order {
  cpf: Cpf;
  coupon?: Coupon;
  freight: Freight;
  private orderItems: OrderItem[];

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.freight = new Freight();
    this.orderItems = [];
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    this.freight.addItem(item);
  }

  applyCoupon(coupon: Coupon, currentDate: Date) {
    if (coupon.isNotExpiration(currentDate)) this.coupon = coupon;
  }

  getTotal() {
    let total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal();
      return total;
    }, 0);
    if (this.coupon) total -= this.coupon.calculateDiscount(total);
    return total;
  }

  getFreight() {
    return this.freight.calculateTotal();
  }
}
