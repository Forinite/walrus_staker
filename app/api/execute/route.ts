import { checkRank, signTransaction } from '@/lib/smc';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { fromBase64 } from '@mysten/sui/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        if (
            typeof data !== 'object' ||
            typeof data.signature !== 'string' ||
            typeof data.bytes !== 'string'
        ) {
            return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
        }

        // const tx = Transaction.fromKind(data.bytes);
        const txBytes = fromBase64(data.bytes);

        const { signature } = await signTransaction(txBytes);

        const suiClient = new SuiClient({ url: getFullnodeUrl("devnet")});

        const result = await suiClient.executeTransactionBlock({
            transactionBlock: txBytes,
            signature: [signature, data.signature]
        });

        console.log("Stat success" ,result)

        return NextResponse.json({ message: 'Success', data: result}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error', error: (error as Error).message }, { status: 500 });
    }
}