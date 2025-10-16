import dotenv from 'dotenv';
import { getFullnodeUrl } from '@mysten/sui/client';

// Load .env into process.env
dotenv.config();

// Network selection: default to testnet unless overridden
export const SUI_NETWORK = (process.env.SUI_NETWORK || 'testnet') as 'devnet' | 'testnet' | 'mainnet';

// Allow overriding the fullnode url directly via env, otherwise derive from SUI_NETWORK
export const FULLNODE_URL = process.env.FULLNODE_URL || getFullnodeUrl(SUI_NETWORK);

// Application environment variables (explicitly exported so other modules import from here)
export const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
export const RECIPIENTADRESS = process.env.RECIPIENTADRESS || '';
export const PACKAGE_ID = process.env.PACKAGE_ID || '';
export const ADMIN_CAP = process.env.ADMIN_CAP || '';

// Validate required envs at startup when desired
export function validateEnv() {
    const missing: string[] = [];
    if (!PRIVATE_KEY) missing.push('PRIVATE_KEY');
    if (!RECIPIENTADRESS) missing.push('RECIPIENTADRESS');
    if (!PACKAGE_ID) missing.push('PACKAGE_ID');
    if (!ADMIN_CAP) missing.push('ADMIN_CAP');

    if (missing.length) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

const AppConfig = {
    SUI_NETWORK,
    FULLNODE_URL,
    PRIVATE_KEY,
    RECIPIENTADRESS,
    PACKAGE_ID,
    ADMIN_CAP,
    validateEnv,
};

export default AppConfig;
