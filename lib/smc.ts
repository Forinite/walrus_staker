import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import dotenv from "dotenv";
import { SignatureWithBytes } from '@mysten/sui/cryptography';
import { toBase64 } from '@mysten/sui/utils';
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

if (!process.env.ADMIN_CAP) {
  throw new Error('ADMIN_CAP environment variable is required but not set');
}

// Private key management
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const keypair = Ed25519Keypair.fromSecretKey(PRIVATE_KEY);
const PACKAGE_ID = process.env.PACKAGE_ID;
const SENDER = keypair.getPublicKey().toSuiAddress();
const ADMIN_CAP = process.env.ADMIN_CAP;


export async function mint_nft(to_address: string, stakeDays: number) {
  const tx = new Transaction();

  const target = `${PACKAGE_ID}::walrus_staker_nfts::mint_to_recepient`;
  const oGType = `${PACKAGE_ID}::walrus_staker_nfts::Og`;
  const walFanType = `${PACKAGE_ID}::walrus_staker_nfts::WalFan`;
  const walStakerType = `${PACKAGE_ID}::walrus_staker_nfts::WalStaker`;

  const NftType = stakeDays >= 90 ? oGType : stakeDays >= 30 ? walFanType : walStakerType;

  tx.moveCall({
    target,
    typeArguments: [NftType],
    arguments: [
      tx.pure.address(to_address),
      tx.object(ADMIN_CAP),
    ]
  });

  tx.setSender(SENDER);
  
  const txBytes = await tx.build({ client: suiClient, onlyTransactionKind: true, });

  return txBytes;

}

export const signTransaction = async (txBytes: Uint8Array<ArrayBufferLike>): Promise<SignatureWithBytes> => {

  const result = await keypair.signTransaction(txBytes);

  return result;
}

export const signAndExecuteTransaction = async (tx: Transaction) => {
  // tx.setGasPrice(200000000000);
  return await keypair.signAndExecuteTransaction({ transaction: tx, client: suiClient })
}

export async function getWalrusStakings(address: string) {
  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
  // 1. Fetch all delegated stakes for the address
  const delegatedStakes = await suiClient.getOwnedObjects({
    owner: address,
    filter: { StructType: '0xd84704c17fc870b8764832c535aa6b11f21a95cd6f5bb38a9b07d2cf42220c66::staked_wal::StakedWal' },
    options: {
      showContent: true,
      showPreviousTransaction: true
    }
  });

  const ageDaysArray = await getAges(delegatedStakes, suiClient);

  const maxAge = Math.max(...ageDaysArray);
  return maxAge;

}

async function getAges(delegatedStakes: any, suiClient: SuiClient): Promise<number[]> {
  if (!delegatedStakes.data[0] || !delegatedStakes.data[0].data) {
    throw new Error('No delegated stakes found for the given address.');
  }

  const ageDaysArray: number[] = [];
  
  for (const deState of delegatedStakes.data) {
    const data = deState.data as { previousTransaction?: string } | undefined;

    if (!data) {
      throw new Error('Delegated stake data is null or undefined.');
    }

    const txDigest = data.previousTransaction;
    if (!txDigest) {
      throw new Error('No previousTransaction digest found for the delegated stake.', );
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

    console.log(`Object is ${ageDays} days old (since l)ast mutation or creation).`);
    ageDaysArray.push(ageDays);
  }

  return ageDaysArray;
}

export function checkRank(stakeDays: number) {
  return stakeDays >= 90 ? "OG" : stakeDays >= 30 ? "Walrus Fan" : "Walrus Staker";
}

export function getSender() {
  return SENDER;
}