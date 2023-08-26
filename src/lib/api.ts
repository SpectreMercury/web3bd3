import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

const aron = 'http://172.16.0.245:8080/';
const kj = 'https://api.web3bd.network/';

const cors = Cors({
    methods: ['GET', 'POST', 'HEAD'],
    origin: '*', // 允许所有来源
});

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

const getRequest = async (baseURL: string, url: string, params: Record<string, any> = {}, req: NextApiRequest, res: NextApiResponse) => {
    debugger;
    await runMiddleware(req, res, cors); // 添加 CORS 支持
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${baseURL}${url}?${query}`);
    return response.json();
}

const postRequest = async (baseURL: string, url: string, data: Record<string, any> = {}) => {
    const response = await fetch(`${baseURL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const fetchRequest = async (baseURL: string, url: string, method: 'GET' | 'POST' = 'GET', data: Record<string, any> = {}) => {
    const response = await fetch(`${baseURL}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export { aron, kj, getRequest, postRequest, fetchRequest };
