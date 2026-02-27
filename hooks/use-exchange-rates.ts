"use client"

import { useState, useEffect } from "react"

export interface ExchangeRates {
    base: string
    rates: Record<string, number>
    updated_at?: string
}

const DEFAULT_RATES: ExchangeRates = {
    base: "USD",
    rates: {
        USD: 1,
        NGN: 1600,
        KES: 154,
        GHS: 15,
        ZAR: 18,
        EUR: 0.92,
        GBP: 0.79,
    },
}

export function useExchangeRates() {
    const [rates, setRates] = useState<ExchangeRates>(DEFAULT_RATES)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRates() {
            try {
                // Try to fetch from real API, fallback to defaults
                const res = await fetch("/api/v1/exchange-rates")
                if (res.ok) {
                    const data = await res.json()
                    setRates(data)
                }
            } catch (e) {
                console.warn("Using default exchange rates due to fetch failure")
            } finally {
                setLoading(false)
            }
        }

        fetchRates()
    }, [])

    const convert = (amountUsd: number, currency: string) => {
        const rate = rates.rates[currency] || 1
        return amountUsd * rate
    }

    const format = (amount: number, currency: string) => {
        const symbols: Record<string, string> = {
            USD: "$",
            NGN: "₦",
            KES: "KSh",
            GHS: "GH₵",
            ZAR: "R",
            EUR: "€",
            GBP: "£",
        }
        const symbol = symbols[currency] || "$"

        const isStrongCurrency = ['USD', 'EUR', 'GBP'].includes(currency);

        if (!isStrongCurrency) {
            if (amount >= 1000) {
                return `${symbol}${Math.ceil(amount / 1000)}k`;
            }
            return `${symbol}${Math.ceil(amount)}`;
        }

        // Tabular numbers for better alignment in lists
        return `${symbol}${amount.toLocaleString(undefined, {
            minimumFractionDigits: amount < 100 ? 2 : 0,
            maximumFractionDigits: 2
        })}`
    }

    return { rates, loading, convert, format }
}
