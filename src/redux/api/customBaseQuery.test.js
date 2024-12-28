import customBaseQuery from './customBaseQuery';
import { fetchWithTimeout } from '../../utils';
import api from '../../constants/urls';

jest.mock('../../utils', () => ({
  fetchWithTimeout: jest.fn(),
}));

describe('customBaseQuery', () => {
  const mockArgs = {
    url: '/test-endpoint',
    method: 'POST',
    body: { key: 'value' },
    headers: { Authorization: 'Bearer token' },
  };

  const mockApiBaseUrl = api.baseUrl;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return data when the request is successful', async () => {
    const mockResponse = { json: jest.fn().mockResolvedValue({ data: 'success' }), ok: true };
    fetchWithTimeout.mockResolvedValue(mockResponse);

    const result = await customBaseQuery(mockArgs);

    expect(fetchWithTimeout).toHaveBeenCalledWith(`${mockApiBaseUrl}${mockArgs.url}`, {
      method: mockArgs.method,
      body: JSON.stringify(mockArgs.body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
    });

    expect(result).toEqual({ data: { data: 'success' } });
  });

  it('should return an error object when the response is not ok', async () => {
    const mockResponse = {
      text: jest.fn().mockResolvedValue('Error occurred'),
      ok: false,
      status: 400,
    };
    fetchWithTimeout.mockResolvedValue(mockResponse);

    const result = await customBaseQuery(mockArgs);

    expect(result).toEqual({
      error: {
        status: 400,
        message: 'Error occurred',
      },
    });
  });

  it('should return an error object when fetchWithTimeout throws an error', async () => {
    fetchWithTimeout.mockRejectedValue(new Error('Network Error'));

    const result = await customBaseQuery(mockArgs);

    expect(result).toEqual({
      error: {
        status: 'FETCH_ERROR',
        message: 'Network Error',
      },
    });
  });
});
