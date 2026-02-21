"use client"

import { useEffect } from 'react'
import Intercom from '@intercom/messenger-js-sdk'

export function IntercomProvider() {
    useEffect(() => {
        // Adding api_base specifically as it was in your original snippet
        // This is often required for workspaces with regional data hosting
        Intercom({
            app_id: 'i7z2dx29',
            api_base: 'https://api-iam.intercom.io',
        })
    }, [])

    return null
}
