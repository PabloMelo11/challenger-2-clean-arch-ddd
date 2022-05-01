import Coupon from '../src/Coupon';

test('Deve criar um cupom', function () {
  const coupon = new Coupon('VALE20', 20, new Date('2022-08-11T10:00:00'));
  expect(coupon.calculateDiscount(1000)).toBe(200);
});

test('Nao deve poder usar um cupom ja expirado', function () {
  const coupon = new Coupon('VALE20', 20, new Date('2022-08-11T10:00:00'));
  expect(() => coupon.isNotExpiration(new Date('2022-08-12T10:00:00'))).toThrow(
    new Error('Cupom Expirado')
  );
});
