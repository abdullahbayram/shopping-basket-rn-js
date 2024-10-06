import { http, HttpResponse } from 'msw';

export const sampleResponse = [
  {
    sku: 1,
    name: 'Product One',
    description: 'Product One description',
    price: 1.11,
  },
  {
    sku: 2,
    name: 'Product Two',
    description: 'Product Two description',
    price: 2.22,
  },
  {
    sku: 3,
    name: 'Product Three',
    description: 'Product Three description',
    price: 3.33,
  },
  {
    sku: 4,
    name: 'Product Four',
    description: 'Product Four description',
    price: 4.44,
  },
  {
    sku: 5,
    name: 'Product Five',
    description: 'Product Five description',
    price: 5.55,
  },
];

export const handlers = [
  http.get('http://localhost:9001/products', () => {
    console.warn('WELCOME');
    return HttpResponse.json(sampleResponse);
  }),

  // Mock the /checkout API endpoint
  http.post('http://localhost:9001/checkout', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];
