export interface MintResponse {
    ok: boolean;
    signedTx?: {
        signature: string;
        bytes: string;
    };
    message: string;
}