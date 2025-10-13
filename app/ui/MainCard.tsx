'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { walrusIcon } from '@/app/icons';
import Minting from '@/app/ui/popUps/Minting';
import Minted from '@/app/ui/popUps/Minted';
import useMinter from '../hooks/useMinter';

const MainCard = () => {
  const [checking, setChecking] = React.useState(false); // whether we've successfully checked (shows claim)
  const [isMinted, setIsMinted] = React.useState(false); // local flag for showing minted UI
  const [MintCheck, setMintCheck] = React.useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Hook: returns { state, mint, isMinting }
  const { state: mintState, mint, isMinting } = useMinter();

  // Controlled input and fetched state
  const [wallet, setWallet] = React.useState('');
  const [stakeDays, setStakeDays] = React.useState<number | null>(null);
  const [checkingLoading, setCheckingLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // For clearing the mint timeout (if you still need a timeout for animation; optional)
  const timeoutRef = useRef<number | null>(null);

  const handleChecking = (bool: boolean) => setChecking(bool);

  // Called when user clicks "Claim Loyalty NFT"
  const handleClaim = async () => {
    setError(null);

    if (!wallet || !wallet.trim().toLowerCase().startsWith('0x')) {
      setError('Please enter an address starting with "0x".');
      return;
    }

    // show popup immediately
    setMintCheck(true);
    setIsMinted(false);

    // call hook's mint - await it so we can rely on hook state after it resolves
    try {
      await mint({ walletAddress: wallet });

      // Optionally wait a short time for UX animation, or rely on hook state via effect below
      // timeoutRef.current = window.setTimeout(() => { /* nothing needed here */ }, 500);
    } catch (err) {
      // useMinter currently doesn't rethrow, it sets state with error; but keep this catch for safety
      setError((err as Error).message ?? 'Mint failed');
    }
  };

  const handleCloseMint = () => {
    setMintCheck(false);
    setIsMinted(false);
    // clear any optional timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // When hook state changes, update local UI (show minted or error)
  useEffect(() => {
    if (!mintState) return;

    if (mintState.ok) {
      // success -> show minted view
      setIsMinted(true);
      setError(null);
    } else {
      // failure -> show error and close popup after a short time (optional)
      setIsMinted(false);
      setError(mintState.message ?? 'Mint failed');
    }
  }, [mintState]);

  // Close when clicking outside popup
  useEffect(() => {
    if (!MintCheck) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleCloseMint();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [MintCheck]);

  // Escape-to-close popup
  useEffect(() => {
    if (!MintCheck) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseMint();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [MintCheck]);

  // Clear timeout if component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // Perform the GET /api/stake?walletAddress=... call
  const onCheckWallet = async () => {
    setError(null);
    setStakeDays(null);

    // validation: only require it starts with "0x"
    if (!wallet || !wallet.trim().toLowerCase().startsWith('0x')) {
      setError('Please enter an address starting with "0x".');
      setChecking(false);
      return;
    }

    setCheckingLoading(true);
    try {
      const res = await fetch(
        `/api/stake?walletAddress=${encodeURIComponent(wallet)}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // handle API error message
        setError(data?.error ?? data?.message ?? 'Failed to fetch stake info.');
        setChecking(false);
      } else {
        // Try to read stakeDays or parse message fallback
        let days: number | null = null;
        if (typeof data?.stakeDays === 'number') {
          days = data.stakeDays;
        } else if (typeof data?.days === 'number') {
          days = data.days;
        } else if (typeof data?.message === 'string') {
          // attempt to extract number from message "You have staked for X Days"
          const m = data.message.match(/(\d+)\s*days?/i);
          if (m) days = parseInt(m[1], 10);
        }

        if (days == null) {
          // If API didn't return a days number, show message (if present)
          if (data?.message) {
            setError(data.message);
            setChecking(false);
          } else {
            setError('Unexpected response format from server.');
            setChecking(false);
          }
        } else {
          setStakeDays(days);
          setChecking(true);
        }
      }
    } catch (err) {
      console.error('Error fetching stake:', err);
      setError('Network error while contacting server.');
      setChecking(false);
    } finally {
      setCheckingLoading(false);
    }
  };

  // Submit on Enter inside input
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCheckWallet();
    }
  };

  return (
    <div className="relative z-10 h-full flex items-center justify-center ">
      {/* main card */}
      <div className="relative lg:scale-80 md:scale-70 scale-90 h-fit flex items-center justify-center pt-[60px] md:mt-16 mt-8">
        <div className="absolute md:-top-[146px] -top-[20px] z-10">
          <Image
            className="md:scale-100 scale-80"
            width={389}
            height={258}
            src={walrusIcon}
            alt="walrusIcon"
          />
        </div>

        <div className="md:w-[100vw] w-[95vw] md:max-w-[925px] md:aspect-[925/494] max-w-[377px] aspect-[377/577] bg-[#3B3D48]/40 backdrop-blur-xs overflow-hidden">
          <div className="absolute -top-12 -right-12 w-[142px] h-[149px] bg-walrus-mint rounded-full blur-xs animate-move-mint" />
          <div className="absolute -bottom-12 -left-12 w-[142px] h-[149px] bg-walrus-grape rounded-full blur-xs animate-move-grape" />

          <div className="w-full h-full bg-[#3B3D48]/0 backdrop-blur-3xl p-4">
            <div className="w-full h-full stroke-on-colored md:pt-0 pt-24">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center">
                  <p className="text-mint-300 font-inter font-extrabold md:text-5xl text-[33px] max-w-[498px] text-center">
                    Have you staked $WAL?
                  </p>

                  <div className="w-full flex flex-col justify-center items-center">
                    <p className="font-inter text-center md:text-[20px] text-[14px] py-3">
                      Check your wallet to see how long you have staked $WAL
                      tokens
                    </p>

                    <input
                      type="text"
                      placeholder="Input your wallet address here"
                      aria-label="Wallet address"
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                      onKeyDown={onInputKeyDown}
                      className="md:text-[18px] text-[12px] stroke-on-dark w-[90%] mx-auto md:h-[55px] h-[33px] md:rounded-[12px] rounded-md focus:outline-none px-12 md:text-left text-center"
                    />
                  </div>

                  <div className="pt-6 pb-4 flex justify-center items-center gap-8">
                    <button
                      onClick={onCheckWallet}
                      disabled={checkingLoading}
                      className="font-inter text-center md:text-base text-[11px] py-2 md:px-12 px-4 bg-[#C482F3] cursor-pointer rounded-lg disabled:opacity-60"
                    >
                      {checkingLoading ? 'Checking...' : 'Check'}
                    </button>

                    {checking && (
                      <button
                        onClick={handleClaim}
                        className="font-inter text-center md:text-base text-[11px] hidden md:block py-2 md:px-12 px-8 bg-[#C482F3] cursor-pointer w-fit rounded-lg mx-auto"
                      >
                        Claim Loyalty NFT
                      </button>
                    )}
                  </div>

                  {checking && (
                    <div>
                      <p className="font-inter text-center text-[14px] md:text-[20px] text-mint-300">
                        {stakeDays !== null
                          ? `You have been staking for ${stakeDays} day${
                              stakeDays === 1 ? '' : 's'
                            }`
                          : 'Stake info available.'}
                      </p>

                      <button
                        onClick={handleClaim}
                        className="font-inter text-center md:text-base text-[11px] block md:hidden py-2 md:px-12 px-8 bg-[#C482F3] cursor-pointer w-fit rounded-lg mx-auto my-3"
                      >
                        Claim Loyalty NFT
                      </button>
                    </div>
                  )}

                  {/* show errors */}
                  {error && (
                    <p
                      className="mt-3 text-center text-[12px] text-red-400"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </div>

                <p className="text-center inter md:hidden block">
                  Stake Walrus
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Layer */}
      {MintCheck && (
        <div className="absolute top-0 z-30 w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div ref={popupRef} className="relative">
            {/* Minting with fade transition driven by hook's isMinting */}
            <div
              className={`transition-opacity duration-500 ${
                isMinting ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Minting />
            </div>

            {/* Minted with fade transition driven by local isMinted (derived from mintState) */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                isMinted ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Minted onClose={handleCloseMint} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCard;
