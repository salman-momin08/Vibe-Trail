
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { Input } from '@/components/ui/input';
import { Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GuestsPage() {
    const [numGuests, setNumGuests] = useState('');
    const router = useRouter();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col p-8">
        <div className="relative mb-4 mt-[2rem]">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-primary" style={{fontFamily: "'Pacifico', cursive", fontSize: '2.5rem'}}>
                V
              </span>
            </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-foreground mb-8">
                    How many guests are we expecting?
                </h1>
                <div className="relative mb-8">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="number"
                        placeholder="No of guests"
                        className="pl-10 py-6"
                        value={numGuests}
                        onChange={(e) => setNumGuests(e.target.value)}
                    />
                </div>
                <div className="flex justify-center gap-4">
                    <Link href="/">
                        <Button variant="outline" size="lg" className="px-12 py-6 text-lg">
                            Back
                        </Button>
                    </Link>
                    <Button size="lg" className="px-12 py-6 text-lg bg-gradient-to-r from-[#6A5ACD] to-[#BDB2FF] text-white" disabled={!numGuests} onClick={() => router.push('/venue')}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
