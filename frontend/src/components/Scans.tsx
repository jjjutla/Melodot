import useUser from '@/app/hook/useUser';
import React, { useEffect, useState } from 'react';
import { Ghost, Plus, SearchCode, Trash, Play } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { getScan, deleteScan } from '@/utils/scanUtils';

type Scan = {
  id: string;
  name: string;
  result: any | null;
  uploaded_at: string;
  user_id: string;
};

export default function Scans() {
  const { data: user, isLoading, error } = useUser();
  const [scans, setScans] = useState<Scan[]>([]);

  useEffect(() => {
    if (user && user.id) {
      getScan(user.id).then((data) => setScans(data));
    }
  }, [user]);

  const handleDelete = async (scanId: string) => {
    if (user && user.id) {
      const success = await deleteScan(scanId, user.id);
      if (success) {
        setScans(scans.filter(scan => scan.id !== scanId));
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div>
      {scans.length > 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {scans
            .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime())
            .map(scan => (
              <li
                key={scan.id}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-300 shadow transition hover:shadow-lg'>
                <Link href={`/dashboard/${scan.id}`} className='flex flex-col gap-2'>
                  <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
                    <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='truncate text-lg font-medium text-zinc-900'>{scan.name}</h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>

                  <Button
                    size="sm"
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleDelete(scan.id)}
                  >
                    <Play className="h-4 w-4" />
                  </Button>

                  <div className='flex items-center gap-2'>
                    <Plus className='h-4 w-10' />
                    {format(new Date(scan.uploaded_at), 'dd MMM yyyy')}
                  </div>

                  {/* 
                  <Button
                    size='sm'
                    className='w-full'
                    variant='destructive'
                    onClick={() => handleDelete(scan.id)}>
                    <Trash className='h-4 w-4' />
                  </Button>
                  */}

                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>Pretty empty around here</h3>
          <p>Marketplace is empty</p>
        </div>
      )}
    </div>
  );
}
