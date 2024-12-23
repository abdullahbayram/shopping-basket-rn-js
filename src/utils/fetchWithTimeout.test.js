import fetchWithTimeout from './fetchWithTimeout';

describe('fetchWithTimeout', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch;
  });

  it('should fetch successfully within timeout', async () => {
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({ data: 'success' }) };
    mockFetch.mockResolvedValue(mockResponse);

    const result = await fetchWithTimeout('https://example.com');

    expect(fetch).toHaveBeenCalledWith('https://example.com', { signal: expect.any(AbortSignal) });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Fetch failed'));

    await expect(fetchWithTimeout('https://example.com')).rejects.toThrow('Fetch failed');
  });

  it('should clear the timeout after the request completes', async () => {
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({ data: 'success' }) };
    mockFetch.mockResolvedValue(mockResponse);

    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    await fetchWithTimeout('https://example.com');

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });
});
