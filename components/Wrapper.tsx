'use client'

import React from 'react'
import { useThemeStore } from '@/store/useThemeStore'

const Wrapper = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const theme = useThemeStore(state => state.theme)
    return (
        <div className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>{children}</div>
    )
}

export default Wrapper