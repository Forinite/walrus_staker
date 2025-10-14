// Small helpers (optional, exported for reuse)
export function bytesToBase64(bytes: Uint8Array | ArrayBuffer): string {
    return Buffer.from(bytes as any).toString('base64');
}

export function base64ToBytes(base64: string): Uint8Array {
    return Uint8Array.from(Buffer.from(base64, 'base64'));
}

export function base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = typeof atob === 'function'
        ? atob(base64)
        : Buffer.from(base64, 'base64').toString('binary'); // fallback for server
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

export function uint8ArrayToBase64(bytes: Uint8Array): string {
    // Browser-safe chunking to avoid call stack / argument length issues
    if (typeof btoa === 'function') {
        const chunkSize = 0x8000; // 32KB
        let binary = '';
        for (let i = 0; i < bytes.length; i += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
        }
        return btoa(binary);
    }
    // Node fallback
    return Buffer.from(bytes).toString('base64');
}