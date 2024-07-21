"use client"

import React from 'react'
import useUser from '../hook/useUser';
import Subscribed from '@/components/Subscribed';
import UploadButton from '@/components/UploadButton';
import Scans from '@/components/Scans';
import { Button } from '@/components/ui/button';



export default function Dashboard() {


  const {data:user, isLoading} = useUser();
  if(isLoading){
    return <></>
  }

  const isActive = !user?.subscription?.end_at ? false : new Date(user.subscription.end_at) > new Date();

  return (
    <main className='mx-auto max-w-7xl md:p-10'>

      <div>
        {isActive ? <Subscribed/>:<div>Not Subscribed</div> }
      </div>

      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-5xl text-white-900'>
          Marketplace
        </h1>
        <UploadButton/>
        <Button  onClick={() => window.location.href = '/upload'}>
          Upload Section of Song
        </Button>
        {/*<Button  onClick={() => window.location.href = '/generate'}>
          Ai Music
        </Button>*/}
      </div>

      {/* display all user scans */}

      <Scans />

      

      

      


    </main>
  )
}
