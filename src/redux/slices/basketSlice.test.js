import basketReducer, { addItemToBasket } from './basketSlice';

test('should add an item to the basket', () => {
  const initialState = { items: [], discount: 0 };
  const newState = basketReducer(initialState, addItemToBasket({ id: 1, name: 'Product 1', price: 100 }));
  expect(newState.items).toEqual([{ id: 1, name: 'Product 1', price: 100, quantity: 1 }]);
});
