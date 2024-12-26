import { selectBasketItems, selectTotalItemCount, selectDiscount, selectTotalPrice } from './basketSelector';

describe('Basket Selectors', () => {
  const mockState = {
    basket: {
      items: [
        { id: 1, name: 'Item 1', price: 50, quantity: 2 },
        { id: 2, name: 'Item 2', price: 100, quantity: 1 },
      ],
      discount: 10, // 10%
    },
  };

  describe('selectBasketItems', () => {
    it('should return the basket items', () => {
      const result = selectBasketItems(mockState);
      expect(result).toEqual(mockState.basket.items);
    });

    it('should return an empty array if basket items are undefined', () => {
      const result = selectBasketItems({ basket: {} });
      expect(result).toEqual([]);
    });
  });

  describe('selectTotalItemCount', () => {
    it('should calculate the total number of items in the basket', () => {
      const result = selectTotalItemCount(mockState);
      expect(result).toBe(3); // 2 + 1
    });

    it('should return 0 if basket items are empty', () => {
      const result = selectTotalItemCount({ basket: { items: [] } });
      expect(result).toBe(0);
    });
  });

  describe('selectDiscount', () => {
    it('should return the discount value', () => {
      const result = selectDiscount(mockState);
      expect(result).toBe(10); // 10%
    });

    it('should return 0 if discount is undefined', () => {
      const result = selectDiscount({ basket: {} });
      expect(result).toBe(0);
    });
  });

  describe('selectTotalPrice', () => {
    it('should calculate the total price with the discount applied', () => {
      const result = selectTotalPrice(mockState);
      expect(result).toBe(180); // (50 * 2 + 100) * 0.9
    });

    it('should return 0 if basket items are empty', () => {
      const result = selectTotalPrice({ basket: { items: [], discount: 10 } });
      expect(result).toBe(0);
    });

    it('should calculate total price without discount if discount is 0', () => {
      const stateWithoutDiscount = { basket: { items: mockState.basket.items, discount: 0 } };
      const result = selectTotalPrice(stateWithoutDiscount);
      expect(result).toBe(200); // 50 * 2 + 100
    });
  });
});
