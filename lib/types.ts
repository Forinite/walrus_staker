export interface MintResponse {
    ok: boolean;
    txBase64?: string;
    message: string;
    sender?: string;
}

export interface CheckStakeDays {
    ok: boolean;
    rank: string;
    stakeDays: number;
    message: string;
}