import Item from '../src/Item';

test('Deve ser possível calcular o volume do item', function () {
  const item = new Item(1, 'Play', 1000, 20, 15, 10, 1);
  const calculateVolume = item.calculateVolume();
  expect(calculateVolume).toBe(0.003);
});

test('Deve ser possível calcular a densidade do item', function () {
  const item = new Item(1, 'Play', 1000, 20, 15, 10, 1);
  const calculateVolume = item.calculateDensity();
  expect(calculateVolume).toBe(333);
});
