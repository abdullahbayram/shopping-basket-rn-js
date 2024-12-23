import basketReducer, {
  addItemToBasket,
  removeItemFromBasket,
  clearBasket,
  clearDiscount,
  updateItemQuantity,
  setDiscount,
} from './basketSlice';

describe('basketSlice reducer', () => {
  const initialState = {
    items: [],
    discount: 0,
  };

  it('initializes with an empty basket and zero discount', () => {
    expect(basketReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('adds a new item to the basket with quantity 1', () => {
    const product = { id: 1, name: 'Product 1', price: 100 };
    const action = addItemToBasket(product);
    const state = basketReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...product, quantity: 1 });
  });

  it('increments the quantity of an existing item in the basket', () => {
    const product = { id: 1, name: 'Product 1', price: 100, quantity: 1 };
    const action = addItemToBasket(product);
    const state = basketReducer({ ...initialState, items: [product] }, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('removes an existing item from the basket', () => {
    const product = { id: 1, name: 'Product 1', price: 100, quantity: 1 };
    const action = removeItemFromBasket(1);
    const state = basketReducer({ ...initialState, items: [product] }, action);

    expect(state.items).toHaveLength(0);
  });

  it('does not remove a non-existing item from the basket', () => {
    const product = { id: 1, name: 'Product 1', price: 100, quantity: 1 };
    const action = removeItemFromBasket(2);
    const state = basketReducer({ ...initialState, items: [product] }, action);

    expect(state.items).toHaveLength(1);
  });

  it('clears all items and resets the discount', () => {
    const product = { id: 1, name: 'Product 1', price: 100, quantity: 1 };
    const action = clearBasket();
    const state = basketReducer({ ...initialState, items: [product], discount: 20 }, action);

    expect(state.items).toHaveLength(0);
    expect(state.discount).toBe(0);
  });

  it('updates the discount to the specified value', () => {
    const action = setDiscount(15);
    const state = basketReducer(initialState, action);

    expect(state.discount).toBe(15);
  });

  it('resets the discount to zero', () => {
    const action = clearDiscount();
    const state = basketReducer({ ...initialState, discount: 20 }, action);

    expect(state.discount).toBe(0);
  });

  it('updates the quantity of an existing item in the basket', () => {
    const product = { id: 1, name: 'Product 1', price: 100, quantity: 1 };
    const action = updateItemQuantity({ id: 1, quantity: 5 });
    const state = basketReducer({ ...initialState, items: [product] }, action);

    expect(state.items[0].quantity).toBe(5);
  });

  it('does not update the quantity of a non-existing item in the basket', () => {
    const product = { id: 1, name: 'Product 1', price: 100, quantity: 1 };
    const action = updateItemQuantity({ id: 2, quantity: 5 });
    const state = basketReducer({ ...initialState, items: [product] }, action);

    expect(state.items[0].quantity).toBe(1);
  });
});
