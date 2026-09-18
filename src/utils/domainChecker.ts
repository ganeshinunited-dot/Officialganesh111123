/**
 * Live Domain Availability Checker Utility
 * Uses Cloudflare DNS-over-HTTPS & Verisign RDAP for live, real-time availability checks without API keys or CORS restrictions.
 */

export interface DomainCheckResult {
  domain: string;
  extension: string;
  available: boolean;
  status: 'available' | 'taken' | 'checking' | 'error';
  isSuggested?: boolean;
  retailValue?: string;
}

// In-memory cache to prevent redundant live network checks
const checkCache = new Map<string, boolean>();

/**
 * Checks if a specific domain is available or taken in real-time
 */
export async function checkSingleDomain(domain: string): Promise<boolean> {
  const cleanDomain = domain.toLowerCase().trim();
  if (!cleanDomain || !cleanDomain.includes('.')) {
    return false;
  }

  if (checkCache.has(cleanDomain)) {
    return checkCache.get(cleanDomain)!;
  }

  try {
    // 1. Cloudflare DNS-over-HTTPS lookup with SOA record
    const cfUrl = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanDomain)}&type=SOA`;
    const cfPromise = fetch(cfUrl, {
      headers: { 'Accept': 'application/dns-json' },
      signal: AbortSignal.timeout(4500)
    }).then(async (res) => {
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    }).catch(() => null);

    // 2. For .com and .net, Verisign RDAP provides authoritative 200 (taken) vs 404 (available)
    let rdapPromise: Promise<number | null> = Promise.resolve(null);
    if (cleanDomain.endsWith('.com') || cleanDomain.endsWith('.net')) {
      const rdapUrl = `https://rdap.verisign.com/com/v1/domain/${encodeURIComponent(cleanDomain)}`;
      rdapPromise = fetch(rdapUrl, {
        signal: AbortSignal.timeout(4500)
      }).then(r => r.status).catch(() => null);
    }

    const [cfData, rdapStatus] = await Promise.all([cfPromise, rdapPromise]);

    // Verisign RDAP authoritative check
    if (rdapStatus === 404) {
      checkCache.set(cleanDomain, true);
      return true;
    }
    if (rdapStatus === 200) {
      checkCache.set(cleanDomain, false);
      return false;
    }

    // Cloudflare DoH Check
    if (cfData) {
      // Status 3 is NXDOMAIN -> Domain does not exist in DNS root -> Available!
      if (cfData.Status === 3) {
        checkCache.set(cleanDomain, true);
        return true;
      }
      // Status 0 with Answer records -> Domain is registered and has active DNS records -> Taken!
      if (cfData.Status === 0 && Array.isArray(cfData.Answer) && cfData.Answer.length > 0) {
        checkCache.set(cleanDomain, false);
        return false;
      }
      // Status 0 with Authority containing SOA of the domain itself -> Taken!
      if (cfData.Status === 0 && Array.isArray(cfData.Authority)) {
        const hasDomainAuthority = cfData.Authority.some((auth: { name?: string }) => 
          auth.name && auth.name.toLowerCase().includes(cleanDomain)
        );
        if (hasDomainAuthority) {
          checkCache.set(cleanDomain, false);
          return false;
        }
      }
    }

    // Secondary fallback to Google DoH if Cloudflare was inconclusive
    const googleUrl = `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=SOA`;
    const googleRes = await fetch(googleUrl, { signal: AbortSignal.timeout(3500) });
    if (googleRes.ok) {
      const gData = await googleRes.json();
      if (gData.Status === 3) {
        checkCache.set(cleanDomain, true);
        return true;
      }
      if (gData.Status === 0 && Array.isArray(gData.Answer) && gData.Answer.length > 0) {
        checkCache.set(cleanDomain, false);
        return false;
      }
    }

    // If still unsure, default to false (conservative)
    return false;
  } catch {
    return false;
  }
}

/**
 * Standard list of core TLDs to check for every query
 */
export const POPULAR_TLDS = [
  { ext: '.com', retail: '$18/yr', featured: true },
  { ext: '.io', retail: '$48/yr', featured: true },
  { ext: '.co', retail: '$32/yr', featured: false },
  { ext: '.net', retail: '$16/yr', featured: false },
  { ext: '.org', retail: '$16/yr', featured: false },
  { ext: '.tech', retail: '$25/yr', featured: false },
  { ext: '.store', retail: '$29/yr', featured: false },
  { ext: '.agency', retail: '$35/yr', featured: false },
  { ext: '.app', retail: '$22/yr', featured: false },
];

/**
 * Generates smart alternative domain candidates if the primary is taken
 */
export function generateDomainSuggestions(baseName: string): string[] {
  const clean = baseName.toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!clean || clean.length < 2) return [];

  return [
    `get${clean}.com`,
    `try${clean}.com`,
    `use${clean}.com`,
    `${clean}hq.com`,
    `${clean}app.com`,
    `${clean}tech.com`,
    `${clean}labs.com`,
    `${clean}studios.com`,
    `${clean}global.com`,
    `join${clean}.com`,
    `the${clean}.com`
  ];
}

/**
 * Cleans user input to extract pure base name
 */
export function extractBaseBrand(input: string): { baseName: string; preferredExt?: string } {
  let cleaned = input.toLowerCase().trim();
  cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, '');
  cleaned = cleaned.split('/')[0].split('?')[0];

  const dotIndex = cleaned.lastIndexOf('.');
  if (dotIndex > 0) {
    const base = cleaned.substring(0, dotIndex).replace(/[^a-z0-9-]/g, '');
    const ext = cleaned.substring(dotIndex);
    return { baseName: base, preferredExt: ext };
  }

  return { baseName: cleaned.replace(/[^a-z0-9-]/g, '') };
}
