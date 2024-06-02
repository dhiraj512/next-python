import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './theme-toggle'

export default function Navbar() {
    return (
        <div className='flex items-center justify-between px-4 h-14 fixed top-0 inset-x-0'>
            <Link href="/">Home</Link>
            <ThemeToggle />
        </div>
    )
}
