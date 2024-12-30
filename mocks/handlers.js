// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';
import { products } from './fixtures';
import { checkBasket, checkCardNumber } from './handlers.util';

export const handlers = [
  http.get('http://localhost:9001/products', async () => {
    // await delay();
    return HttpResponse.json(products);
  }),

  http.post('http://localhost:9001/checkout', async ({ request }) => {
    // await delay(); // Uncomment this line to simulate network delay(Be careful, it will slow down your tests and may fail them)
    const body = await request.json();
    const { cardNumber, basket } = body;

    // Validate basket and card number
    const errors = [];
    const basketError = checkBasket(basket);
    const cardError = checkCardNumber(cardNumber);

    if (basketError) errors.push(basketError);
    if (cardError) errors.push(cardError);

    if (errors.length > 0) {
      return HttpResponse.json({ errors }, { status: 400 });
    }

    return HttpResponse.json({ message: 'The transaction was completed successfully.' });
  }),

  http.post('http://localhost:9001/promocode', async ({ request }) => {
    // await delay();
    const { promoCode } = await request.json();
    const match = promoCode?.match(/^A([\d]{1,2})$/);

    if (match) {
      const amount = parseInt(match[1], 10);
      return HttpResponse.json({ discountType: 'percent', amount });
    }

    return HttpResponse.json(
      { errors: [{ field: 'promoCode', message: 'The promo code you supplied is invalid.' }] },
      { status: 400 },
    );
  }),
];

export const sampleBasket = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
    quantity: 3,
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      rate: 4.1,
      count: 259,
    },
    quantity: 4,
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: {
      rate: 4.7,
      count: 500,
    },
    quantity: 2,
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit',
    price: 15.99,
    description:
      'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: {
      rate: 2.1,
      count: 430,
    },
    quantity: 2,
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: {
      rate: 4.6,
      count: 400,
    },
    quantity: 3,
  },
];
