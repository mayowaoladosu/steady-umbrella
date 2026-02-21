"use client"

import { CroctProvider as Provider } from '@croct/plug-react'
import { ReactNode } from 'react'

export function CroctProvider({ children }: { children: ReactNode }) {
    return (
        <Provider appId="29456b84-7aa7-4da2-80e8-905cb786d8dd">
            {children}
        </Provider>
    )
}
