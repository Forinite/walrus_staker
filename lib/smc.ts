import { PaginatedObjectsResponse, SuiClient, SuiObjectResponse } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { SignatureWithBytes } from '@mysten/sui/cryptography';
import config from './config';

// validate required envs (throws if required ones missing)
config.validateEnv();

// Configuration - use centralized FULLNODE_URL
const suiClient = new SuiClient({ url: config.FULLNODE_URL });

// Private key management
const PRIVATE_KEY = config.PRIVATE_KEY;
const keypair = Ed25519Keypair.fromSecretKey(PRIVATE_KEY);
const PACKAGE_ID = config.PACKAGE_ID;
const SENDER = keypair.getPublicKey().toSuiAddress();
const ADMIN_CAP = config.ADMIN_CAP;


export async function mint_nft(to_address: string, stakeDays: number) {
  
  const target = `${PACKAGE_ID}::walrus_staker_nfts::mint_to_recepient`;
  const oGType = `${PACKAGE_ID}::walrus_staker_nfts::Og`;
  const walFanType = `${PACKAGE_ID}::walrus_staker_nfts::WalFan`;
  const walStakerType = `${PACKAGE_ID}::walrus_staker_nfts::WalStaker`;
  
  const NftType = stakeDays >= 90 ? oGType : stakeDays >= 30 ? walFanType : walStakerType;
  
  // check if type exists
  const nftExists = await suiClient.getOwnedObjects({
    owner: to_address,
    filter: { StructType: NftType },
    options: {
      showContent: true,
    }
  });

  if (!(nftExists.data[0])) {
    throw Error(`You already have NFT of type ${checkRank(stakeDays)}`);
  }

  const tx = new Transaction();
  
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

export const signTransaction = async (txBytes: Uint8Array | ArrayBuffer): Promise<SignatureWithBytes> => {
  const bytes = txBytes instanceof ArrayBuffer ? new Uint8Array(txBytes) : txBytes;
  const result = await keypair.signTransaction(bytes);
  return result;
}

export const signAndExecuteTransaction = async (tx: Transaction) => {
  return await keypair.signAndExecuteTransaction({ transaction: tx, client: suiClient })
}

export async function getWalrusStakings(address: string) {
  // 1. Fetch all delegated stakes for the address
  const delegatedStakes = await suiClient.getOwnedObjects({
    owner: address,
    filter: { StructType: config.WALRUS_NFT_TYPE },
    options: {
      showContent: true,
      showPreviousTransaction: true
    }
  });

  const ageDaysArray = await getAges(delegatedStakes, suiClient);

  const maxAge = Math.max(...ageDaysArray);
  return maxAge;
}


async function getAges(
  paginated: PaginatedObjectsResponse,
  suiClient: SuiClient
): Promise<number[]> {
  if (!paginated.data || paginated.data.length === 0) {
    throw new Error('No delegated stakes found for the given address.');
  }

  // Type guard: ensure object has non-null data and a previousTransaction string
  function hasPreviousTx(
    obj: SuiObjectResponse
  ): obj is SuiObjectResponse & { data: { previousTransaction?: string } } {
    return !!obj.data && typeof (obj.data as { previousTransaction?: unknown }).previousTransaction === 'string';
  }

  const candidates = paginated.data.filter(hasPreviousTx);
  if (candidates.length === 0) {
    throw new Error('No delegated stakes with previousTransaction found.');
  }

  // Parallel fetch; consider adding concurrency control for many items
  const agePromises = candidates.map(async (o) => {
    const txDigest = (o.data as { previousTransaction?: unknown }).previousTransaction as string;
    const txBlock = await suiClient.getTransactionBlock({ digest: txDigest });

    const timestampMs = txBlock.timestampMs;
    if (timestampMs === null || timestampMs === undefined) {
      throw new Error('Transaction block does not have a valid timestamp.');
    }

    const now = Date.now();
    // ageDays = floor((now - timestampMs) / (1000 * 60 * 60 * 24))
    const ageDays = Math.floor((now - Number(timestampMs)) / (1000 * 60 * 60 * 24));
    return ageDays;
  });

  return Promise.all(agePromises);
}

export function checkRank(stakeDays: number) {
  return stakeDays >= 90 ? "OG" : stakeDays >= 30 ? "Walrus Fan" : "Walrus Staker";
}

export function getSender() {
  return SENDER;
}