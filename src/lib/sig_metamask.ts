import { ethers } from 'ethers';
import {Obj} from "@popperjs/core";

interface MetadataEvent {
    id: string;
    pubkey: string;
    created_at: number;
    kind: number;
    tags: string[];
    content: object;
    sig?: string;
}

async function createMetadataEvent(
    walletAddress: string,
    content: object,
): Promise<MetadataEvent> {
    const timestamp = parseInt((Date.now() / 1000).toString());
    const json = JSON.stringify([0, walletAddress, timestamp, 0, [], content]);
    const event_hash_id = ethers.sha256(new TextEncoder().encode(json));

    const metadata_event: MetadataEvent = {
        id: event_hash_id,
        pubkey: walletAddress,
        created_at: timestamp,
        kind: 0,
        tags: [],
        content: content,
    };

    const sig = await ethereum.request({
        method: "personal_sign",
        params: [ethers.hexlify(new TextEncoder().encode(json)), walletAddress],
    });

    metadata_event.sig = sig;

    return metadata_event;
}

export default createMetadataEvent;
