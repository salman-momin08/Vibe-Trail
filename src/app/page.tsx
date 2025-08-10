
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { Cake, Gift, Heart, PartyPopper } from 'lucide-react';
import Link from 'next/link';

const eventTypes = [
  { name: 'Wedding', icon: <Heart className="h-5 w-5 mr-2" /> },
  { name: 'Children\'s Birthday Party', icon: <PartyPopper className="h-5 w-5 mr-2" /> },
  { name: 'Birthday', icon: <Cake className="h-5 w-5 mr-2" /> },
  { name: 'Other Party', icon: <Gift className="h-5 w-5 mr-2" /> },
];

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background">
       <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');`}
       </style>
      <Sidebar />
      <main className="flex-1 flex flex-col items-center p-8">
        <div className="w-full max-w-2xl">
          <div className="relative mb-8 mt-[2rem]">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-primary" style={{fontFamily: "'Pacifico', cursive", fontSize: '2.5rem'}}>
                V
              </span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mt-12 mb-4">
                Hi there! Let's see the future of your dream event together.
            </h1>
            <p className="text-muted-foreground mb-12">
                Tell me, what kind of event are we planning?
            </p>
            <div className="flex justify-center gap-4">
                {eventTypes.map((event) => (
                <Button
                    key={event.name}
                    variant={selectedEvent === event.name ? 'default' : 'outline'}
                    className={`py-6 px-6 border ${selectedEvent === event.name ? 'bg-primary text-primary-foreground border-primary' : 'bg-card'}`}
                    onClick={() => setSelectedEvent(event.name)}
                >
                    {event.icon}
                    {event.name}
                </Button>
                ))}
            </div>
            <div className="mt-12">
                <Link href="/guests">
                    <Button size="lg" className="px-16 py-6 text-lg bg-gradient-to-r from-[#6A5ACD] to-[#BDB2FF] text-white" disabled={!selectedEvent}>
                    Next
                    </Button>
                </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
