import { kj, getRequest } from '@/lib/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const walletAddress = req.query.addr; // 假设你从查询参数中获取 walletAddress
    const response = await getRequest(kj, `/api/profile`, { addr: walletAddress }, req, res);
    res.json(response);
}
