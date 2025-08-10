
'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const vibes = [
  { name: 'Rustic Chic', image: 'https://placehold.co/400x600.png', aiHint: 'rustic chic wedding' },
  { name: 'Whimsical', image: 'https://placehold.co/400x600.png', aiHint: 'whimsical wedding' },
  { name: 'Royal', image: 'https://placehold.co/400x600.png', aiHint: 'royal wedding' },
];

export default function VibePage() {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col p-8">
        <div className="relative mb-4 mt-2">
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
            <div className="w-full max-w-4xl text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L12 2C14.2091 2 16 3.79086 16 6V8C16 10.2091 14.2091 12 12 12V12C9.79086 12 8 10.2091 8 8V6C8 3.79086 9.79086 2 12 2V2Z" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                    <path d="M12 12L12 22" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 22H16" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 16H19" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Congratulations on your wedding!</h1>
              <p className="text-muted-foreground mb-8">Tell us, what's your vibe?</p>
              
              <div className="flex items-center justify-center gap-8 mb-8">
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className="flex-1 grid grid-cols-3 gap-6">
                  {vibes.map((vibe) => (
                    <Card 
                      key={vibe.name}
                      className={`overflow-hidden cursor-pointer transition-all duration-300 ${selectedVibe === vibe.name ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                      onClick={() => setSelectedVibe(vibe.name)}
                    >
                      <CardContent className="p-0 relative">
                        <Image src={vibe.image} alt={vibe.name} width={400} height={600} className="w-full h-auto object-cover" data-ai-hint={vibe.aiHint} />
                        <div className="absolute bottom-4 left-0 right-0">
                          <div className="bg-white/80 backdrop-blur-sm p-2 mx-auto w-fit rounded-md">
                            <span className="font-semibold text-foreground">{vibe.name}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </div>

              <div className="text-center mb-8">
                  <p className="text-muted-foreground mb-4">Have a vibe in mind?<br/>Upload them below, we will analyse and suggest your perfect vibe</p>
                  <div className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center max-w-lg mx-auto">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload upto 3 images</p>
                  </div>
              </div>

              <div className="flex justify-center gap-4">
                <Link href="/venue">
                  <Button variant="outline" size="lg" className="px-12 py-6 text-lg">
                    Back
                  </Button>
                </Link>
                <Button size="lg" className="px-12 py-6 text-lg bg-gradient-to-r from-[#6A5ACD] to-[#BDB2FF] text-white" disabled={!selectedVibe} onClick={() => router.push('/recommendations')}>
                  Next
                </Button>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}
