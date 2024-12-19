const validateBasket = (array) => {
  if (!array || !Array.isArray(array)) {
    console.error('Invalid input: expected a non-empty array');
    return false;
  }

  if (array.length === 0) {
    return false;
  }

  return true;
};

export default validateBasket;