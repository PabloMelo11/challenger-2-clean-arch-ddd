import Coupon from '../src/Coupon';
import Item from '../src/Item';
import Order from '../src/Order';

test('Não deve criar um pedido com CPF inválido', function () {
  expect(() => new Order('111.111.111-11')).toThrow(new Error('CPF Inválido'));
});

test('Deve criar um pedido com 3 itens (com descrição, preço e quantidade)', function () {
  const order = new Order('935.411.347-80');
  order.addItem(new Item(1, 'Guitarra', 1000, 20, 15, 10, 1), 1);
  order.addItem(new Item(2, 'Amplificador', 5000, 20, 15, 10, 1), 1);
  order.addItem(new Item(3, 'Cabo', 30, 20, 15, 10, 1), 3);
  const total = order.getTotal();
  expect(total).toBe(6090);
});

test('Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido)', function () {
  const order = new Order('935.411.347-80');
  order.addItem(new Item(1, 'Guitarra', 1000, 20, 15, 10, 1), 1);
  order.addItem(new Item(2, 'Amplificador', 5000, 20, 15, 10, 1), 1);
  order.addItem(new Item(3, 'Cabo', 30, 20, 15, 10, 1), 3);
  order.applyCoupon(
    new Coupon('VALE20', 20, new Date('2022-08-11T10:00:00')),
    new Date('2022-08-10T10:00:00')
  );
  const total = order.getTotal();
  expect(total).toBe(4872);
});

test('Nao Deve possível aplicar um cupom expirado', function () {
  const order = new Order('935.411.347-80');
  order.addItem(new Item(1, 'Guitarra', 1000, 20, 15, 10, 1), 1);
  const coupon = new Coupon('VALE20', 20, new Date('2022-08-11T10:00:00'));
  expect(() =>
    order.applyCoupon(coupon, new Date('2022-08-12T10:00:00'))
  ).toThrow(new Error('Cupom Expirado'));
});

test('Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg)', function () {
  const order = new Order('935.411.347-80');
  order.addItem(new Item(1, 'Play', 1000, 20, 15, 10, 1), 1);
  order.addItem(new Item(2, 'Chocolate', 1000, 20, 15, 10, 1), 1);
  const freight = order.getFreight();
  expect(freight).toBe(39.96);
});

test('Deve retornar o preço mínimo de frete (R$10,00) caso ele seja superior ao valor calculado', function () {
  const order = new Order('935.411.347-80');
  order.addItem(new Item(1, 'Play', 1000, 20, 15, 10, 1), 1);
  const freight = order.getFreight();
  expect(freight).toBe(10.0);
});
