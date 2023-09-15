import { ApiResponse } from '@/Types/aronInterface'

const BASE_URL = 'http://124.223.105.57:8883';

interface Params {
    [key: string]: string | number | boolean;
}

async function fetchWithParams(endpoint: string, params: Params = {}): Promise<ApiResponse> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key].toString()));

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}

export { fetchWithParams };
