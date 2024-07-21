import React from "react";
import Profile from "./Profile";
import Link from 'next/link'
import { buttonVariants } from './ui/button'



export default function Navbar() {

    return (
        <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-700 backdrop-blur-lg transition-all'>


                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link href="/" className="flex z-40 font-semibold">
                        <img src="/logo_small.png" alt="Gecko logo" className="h-8 w-auto"/>
                    </Link>

                    <Link href='/dashboard' className={buttonVariants({variant: 'ghost', size: 'sm',})}>
                        Marketplace
                    </Link>

                    <Link href='/generate'className={buttonVariants({variant: 'ghost', size: 'sm',})}>
                        Generate
                    </Link>

                    <Profile />

                    
                </div>


        </nav>


    );
    
}
