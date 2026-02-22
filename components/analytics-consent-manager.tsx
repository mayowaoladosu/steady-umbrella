'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const ANALYTICS_CONSENT_STORAGE_KEY = 'analytics-consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

type AnalyticsConsentManagerProps = {
  analyticsId: string
}

export function AnalyticsConsentManager({ analyticsId }: AnalyticsConsentManagerProps) {
  const [analyticsConsented, setAnalyticsConsented] = useState<boolean | null>(null)

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)

    if (storedConsent === 'granted') {
      setAnalyticsConsented(true)
      return
    }

    if (storedConsent === 'denied') {
      setAnalyticsConsented(false)
      return
    }

    setAnalyticsConsented(null)
  }, [])

  useEffect(() => {
    if (analyticsConsented !== false) {
      return
    }

    window[`ga-disable-${analyticsId}`] = true
    window.dataLayer = []
    window.gtag = () => undefined
  }, [analyticsConsented, analyticsId])

  const updateConsent = (consented: boolean) => {
    setAnalyticsConsented(consented)
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consented ? 'granted' : 'denied')

    if (consented) {
      window[`ga-disable-${analyticsId}`] = false
      return
    }

    window[`ga-disable-${analyticsId}`] = true
    window.dataLayer = []
    window.gtag = () => undefined
  }

  return (
    <>
      {analyticsConsented === null && (
        <div className="fixed inset-x-4 bottom-4 z-50 rounded-lg border border-neutral-300 bg-background p-4 shadow-lg md:inset-x-auto md:right-4 md:max-w-md">
          <p className="text-sm text-foreground">
            We use analytics cookies to understand how our site is used. You can accept or decline optional
            analytics tracking.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => updateConsent(true)}
              className="rounded-md bg-foreground px-3 py-2 text-sm text-background"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => updateConsent(false)}
              className="rounded-md border border-neutral-400 px-3 py-2 text-sm"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {analyticsConsented && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${analyticsId}');
            `}
          </Script>
        </>
      )}
    </>
  )
}
