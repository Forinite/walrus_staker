import { MintResponse } from '@/lib/types';
import { useState, useCallback } from 'react';

function useMinter() {
    const [state, setState] = useState<MintResponse | null>(null);
    const [isMinting, setISMinting] = useState(false);

    const mint = useCallback(async (params: any) => {
        // Implement minting logic here
        // setState with result or error

        // start
        // Make post request to api/stake with `walletAddress: string`
        try {
            setISMinting(true);
            const response = await fetch('/api/stake', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ walletAddress: params.walletAddress }),
            });

            if (!response.ok) {
                throw new Error('Failed to stake');
            }

            const data = await response.json();
            setState({ ...data });
            setISMinting(false);
        } catch (error) {
            setISMinting(false);
            setState({ ok: false, message: (error as Error).message });
        }
    }, []);

    return {
        state,
        mint,
        isMinting,
    };
}

export default useMinter;