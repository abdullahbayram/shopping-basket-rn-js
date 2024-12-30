export function createError(field, message) {
  return { field, message };
}

export function delay(minMs = 100, maxMs = 500) {
  // if (process.env.NODE_ENV === 'test') return Promise.resolve(); // Uncomment this line to speed up tests after implementing environment variables
  const timeout = Math.floor(Math.random() * (maxMs - minMs + 1) + minMs);
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export function checkCardNumber(cardNumber) {
  if (typeof cardNumber !== 'string') {
    return createError('cardNumber', 'You have not provided a card number.');
  }
  if (cardNumber.length !== 16) {
    return createError('cardNumber', 'You have not provided a valid card number.');
  }
  if (/^5249045959484101$/.test(cardNumber)) {
    return createError('cardNumber', 'Card can not be processed.');
  }
  return null;
}

export function checkBasket(basket) {
  if (!basket) {
    return createError('basket', 'You have not sent a basket.');
  }
  if (!Array.isArray(basket)) {
    return createError('basket', 'Basket has to be an array.');
  }
  if (basket.length === 0) {
    return createError('basket', 'Your basket is empty.');
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const item of basket) {
    if (!item.id || !item.quantity) {
      return createError(
        'basket',
        'One or more items in your basket is invalid. Each item must have an id and quantity.',
      );
    }
  }
  return null;
}
