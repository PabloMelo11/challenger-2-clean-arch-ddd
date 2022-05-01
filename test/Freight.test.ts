import Freight from '../src/Freight';
import Item from '../src/Item';

test('Deve ser possível calcular o valor do frete com base nos itens', function () {
  const PlayStation = new Item(1, 'Play', 1000, 20, 15, 10, 1);
  const Chocolate = new Item(1, 'Chocolate', 1000, 20, 15, 10, 1);
  const freight = new Freight();
  freight.addItem(PlayStation);
  freight.addItem(Chocolate);
  expect(freight.calculateTotal()).toBe(39.96);
});

test('Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado', function () {
  const PlayStation = new Item(1, 'Play', 1000, 20, 15, 10, 1);
  const freight = new Freight();
  freight.addItem(PlayStation);
  expect(freight.calculateTotal()).toBe(10.0);
});
