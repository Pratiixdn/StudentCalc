import { useEffect, useRef } from 'react';

/**
 * Renders a Google AdSense ad unit.
 * Set NEXT_PUBLIC_ADSENSE_ID and pass a real adSlot id once approved.
 * Renders nothing (no broken box) until AdSense is configured.
 */
export default function AdSlot({ adSlot, style, format = 'auto' }) {
  const ref = useRef(null);
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!adsenseId || !adSlot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch { /* noop */ }
  }, [adsenseId, adSlot]);

  if (!adsenseId || !adSlot) return null;

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={adsenseId}
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
