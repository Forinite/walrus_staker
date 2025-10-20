import { checkRank, getSender, getWalrusStakings, mint_nft } from '@/lib/smc';
import { CheckStakeDays, MintResponse } from '@/lib/types';
import { toBase64 } from '@mysten/sui/utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // Parse the URL and query params from the incoming Request
        const url = new URL(request.url);
        const searchParams = url.searchParams;

        // routes: /api/stake?walletAddress=0x...
        const walletAddress = searchParams.get('walletAddress') ?? undefined;


        if (!walletAddress || typeof walletAddress !== 'string') {
            return NextResponse.json(
                { ok: false, message: 'Missing required query parameter: walletAddress' },
                { status: 400 }
            );
        }

        console.log(walletAddress);
        // sui address validation
        // if (isValidSuiAddress(walletAddress)) {
        //     return NextResponse.json({ ok: false, message: 'Invalid wallet address' }, { status: 400 });
        // }

        

        // Call your existing function (sync or async) to get staking data
        const stakeDays = await getWalrusStakings(walletAddress);

        return NextResponse.json({
            ok: true,
            stakeDays,
            rank: checkRank(stakeDays),
            message: `You have staked for ${stakeDays} Days`,
        } as CheckStakeDays);
    } catch (err) {
        console.error('GET /api/stake error:', err);
        return NextResponse.json({ ok: false, message: (err as Error).message || 'Unknown error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const walletAddress = body.walletAddress;

        if (!walletAddress || typeof walletAddress !== 'string') {
            return NextResponse.json(
                { ok: false, message: 'Missing required field: walletAddress' },
                { status: 400 }
            );
        }

        // if (!isValidSuiAddress(walletAddress)) {
        //     return NextResponse.json({ ok: false, message: 'Invalid wallet address' }, { status: 400 });
        // }

        const stakeDays = await getWalrusStakings(walletAddress);


        const txBase64 = toBase64(await mint_nft(walletAddress, stakeDays));

        return NextResponse.json({
            ok: true,
            txBase64,
            sender: getSender(),
            message: `Run transaction to get Nft`,
        } as MintResponse);
    } catch (err) {
        console.error('POST /api/stake error:', err);
        return NextResponse.json({ ok: false, message: (err as Error).message || 'unknown error' }, { status: 404 });
    }
}