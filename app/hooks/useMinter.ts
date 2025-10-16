"use client";
import { CheckStakeDays, MintResponse } from '@/lib/types';
import { useCurrentAccount, useSignAndExecuteTransaction, useSignTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { fromBase64 } from '@mysten/sui/utils';
import { useState, useCallback } from 'react';

function useMinter() {
    const [state, setState] = useState<MintResponse | null>(null);
    const [isMinting, setISMinting] = useState(false);
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const suiClient = useSuiClient();
    const currentAccount = useCurrentAccount();
    const { mutate: signTransaction } = useSignTransaction();

    // check (GET) state
    const [checkingLoading, setCheckingLoading] = useState(false);
    const [stakeDays, setStakeDays] = useState<number | null>(null);
    const [checking, setChecking] = useState(false);
    const [checkError, setCheckError] = useState<string | null>(null);
    const [rank, setRank] = useState<string | null>(null);

    const mint = useCallback(async (params: any) => {
        // Implement minting logic here
        // setState with result or error

        // start
        // Make post request to api/stake with `walletAddress: string`
        try {
            if (!currentAccount?.address) {
                throw Error("Please connect wallet!")
            }

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

            const data: MintResponse = await response.json();

            if (!data.txBase64) {
                throw new Error("Transaction wasn't created")
            }

            if (!data.sender) {
                throw new Error("Sender wasn't added to response")
            }

            const txBytes = fromBase64(data.txBase64);
            const tx = Transaction.fromKind(txBytes);

            tx.setSender(data.sender);
            tx.setGasOwner(currentAccount.address);


            const userResponse = await new Promise(async (resolve, reject) => {
                signTransaction({ transaction: tx }, { onSuccess: resolve, onError: reject })

            });

            const response2 = await fetch('/api/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userResponse),
            });

            if (!response2.ok) {
                throw new Error('Failed to stake');
            }

            console.log(await response2.json());
            setState({ ...data });
            setISMinting(false);
        } catch (error) {
            setISMinting(false);
            setState({ ok: false, message: (error as Error).message });
        }
    }, [currentAccount, signAndExecuteTransaction]);

    const checkWallet = useCallback(async (walletAddress: string) => {
        setCheckError(null);
        setStakeDays(null);
        setChecking(false);

        if (!walletAddress || !walletAddress.trim().toLowerCase().startsWith('0x')) {
            const msg = 'Please enter an address starting with "0x".';
            setCheckError(msg);
            return { ok: false, message: msg, days: null } as const;
        }

        setCheckingLoading(true);
        try {
            const res = await fetch(`/api/stake?walletAddress=${encodeURIComponent(walletAddress)}`, {
                method: 'GET',
                headers: { Accept: 'application/json' },
            });

            const data: CheckStakeDays = await res.json().catch(() => ({}));

            if (!res.ok) {
                const msg = data.message ?? 'Failed to fetch stake info.';
                setCheckError(msg);
                setChecking(false);
                return { ok: false, message: msg, days: null } as const;
            }


            if (data.stakeDays == null) {
                if (data.message) {
                    setCheckError(data.message);
                    setChecking(false);
                    return { ok: false, message: data.message, days: null } as const;
                }
                const msg = 'Unexpected response format from server.';
                setCheckError(msg);
                setChecking(false);
                return { ok: false, message: msg, days: null } as const;
            }

            setRank(data.rank);
            setStakeDays(data.stakeDays);
            setChecking(true);
            return { ok: true, message: data?.message ?? 'OK', days: data.stakeDays } as const;
        } catch (err) {
            console.error('Error fetching stake:', err);
            const msg = 'Network error while contacting server.';
            setCheckError(msg);
            setChecking(false);
            return { ok: false, message: msg, days: null } as const;
        } finally {
            setCheckingLoading(false);
        }
    }, []);

    return {
        state,
        mint,
        isMinting,
        rank,
        // check
        checkWallet,
        checkingLoading,
        stakeDays,
        checking,
        checkError,
    };
}

export default useMinter;