import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import dotenv from "dotenv";
import { SignatureWithBytes } from '@mysten/sui/cryptography';
dotenv.config();

// Configuration
const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

// Private key management - REQUIRED environment variable
if (!process.env.PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY environment variable is required but not set');
}

if (!process.env.RECIPIENTADRESS) {
    throw new Error('RECIPIENTADRESS environment variable is required but not set');
}

if (!process.env.PACKAGE_ID) {
    throw new Error('PACKAGE_ID environment variable is required but not set');
}
// Private key management
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const keypair = Ed25519Keypair.fromSecretKey(PRIVATE_KEY);
const PACKAGE_ID = process.env.PACKAGE_ID;
const SENDER = keypair.getPublicKey().toSuiAddress();


export async function mint_nft(to_address: string) {
    const tx = new Transaction();

    const target = `${PACKAGE_ID}::walrus_staker_nfts::mint_to_recepient`;
    const oGType = `${PACKAGE_ID}::walrus_staker_nfts::Og`;
    
    tx.moveCall({
        target,
        typeArguments: [oGType],
        arguments: [
            tx.pure.string("Walrus Og"),
            tx.pure.address(to_address)
        ]
    });

    tx.setSender(SENDER);
    // const txBytes = await tx.build({ client: suiClient });

    // const result = await keypair.signTransaction(txBytes);

    // const result = await keypair.signAndExecuteTransaction({ transaction: tx, client: suiClient})

    return tx;
}

export const signTransaction = async (tx: Transaction): Promise<SignatureWithBytes> => {
  const txBytes = await tx.build({ client: suiClient });

  const result = await keypair.signTransaction(txBytes);

  return result;
} 

export const signAndExecuteTransaction = async (tx: Transaction) => {
  return await keypair.signAndExecuteTransaction({ transaction: tx, client: suiClient})
}

export async function getWalrusStakings(address: string) {
  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
  // 1. Fetch all delegated stakes for the address
  const delegatedStakes = await suiClient.getOwnedObjects({ 
    owner: address,
    filter: { StructType: '0xd84704c17fc870b8764832c535aa6b11f21a95cd6f5bb38a9b07d2cf42220c66::staked_wal::StakedWal'},
    options: {
      showContent: true,
      showPreviousTransaction: true
  } });
  
  if (!delegatedStakes.data[0] || !delegatedStakes.data[0].data) {
    throw new Error('No delegated stakes found for the given address.');
  }
  const txDigest = delegatedStakes.data[0].data.previousTransaction;
  if (!txDigest) {
    throw new Error('No previousTransaction digest found for the delegated stake.');
  }
  const txBlock = await suiClient.getTransactionBlock({ digest: txDigest });

  // 5. Get the timestamp (in milliseconds)
  const timestampMs = txBlock.timestampMs;

  if (timestampMs === null || timestampMs === undefined) {
    throw new Error('Transaction block does not have a valid timestamp.');
  }

  // 6. Calculate the age (in days)
  const now = Date.now();
  const ageDays = Math.floor((now - Number(timestampMs)) / (1000 * 60 * 60 * 24));

  console.log(`Object is ${ageDays} days old (since last mutation or creation).`);
  return ageDays;
  }