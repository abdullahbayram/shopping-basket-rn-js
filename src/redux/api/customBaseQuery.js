import api from '../../constants/urls';
import { fetchWithTimeout } from '../../utils';

export default async (args) => {
  const { url, method = 'GET', body, headers } = args;

  try {
    const response = await fetchWithTimeout(`${api.baseUrl}${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    if (!response.ok) {
      return {
        error: {
          status: response.status,
          msg: await response.text(),
        },
      };
    }
    return { data: await response.json() };
  } catch (error) {
    return {
      error: {
        status: 'FETCH_ERROR',
        msg: error.message,
      },
    };
  }
};
