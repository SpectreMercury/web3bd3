interface Ethereum {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, listener: (...args: any[]) => void) => void;
    removeListener: (event: string, listener: (...args: any[]) => void) => void;
}

interface Window {
    ethereum?: Ethereum;
}

declare module "*.mp4" {
    const src: string;
    export default src;
}