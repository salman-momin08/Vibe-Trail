
'use client';

import { Sidebar } from '@/components/layout/sidebar';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const rusticImages = [
  { src: 'https://placehold.co/400x500.png', alt: 'Rustic wedding couple', aiHint: 'rustic wedding couple', className: 'col-span-2 row-span-2' },
  { src: 'https://placehold.co/300x250.png', alt: 'Rustic barn venue', aiHint: 'rustic barn' },
  { src: 'https://placehold.co/300x250.png', alt: 'Couple under string lights', aiHint: 'wedding string lights' },
  { src: 'https://placehold.co/300x250.png', alt: 'Rustic wedding reception table', aiHint: 'wedding reception' },
  { src: 'https://placehold.co/300x250.png', alt: 'Bridesmaids in rustic setting', aiHint: 'rustic bridesmaids' },
  { src: 'https://placehold.co/300x250.png', alt: 'Wedding table setting', aiHint: 'wedding table' },
  { src: 'https://placehold.co/300x250.png', alt: 'Rustic wedding welcome sign', aiHint: 'wedding sign' },
];

export default function RecommendationsPage() {
    const router = useRouter();
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Here is Your Vibe!</h1>
                <p className="text-muted-foreground mb-8">
                    Based on the deep florals and color palette in your images, we think<br/> your vibe is
                </p>
                <div className="relative">
                    <div className="grid grid-cols-4 gap-4 auto-rows-fr">
                        {rusticImages.map((image, index) => (
                            <div key={index} className={`relative rounded-lg overflow-hidden ${image.className || ''}`}>
                                 <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={400}
                                    height={500}
                                    className="w-full h-full object-cover"
                                    data-ai-hint={image.aiHint}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                            <span className="text-2xl font-semibold text-foreground">Rustic Chic</span>
                        </div>
                    </div>
                </div>
                 <div className="flex justify-center gap-4 mt-8">
                    <Button size="lg" className="px-12 py-6 text-lg bg-gradient-to-r from-[#6A5ACD] to-[#BDB2FF] text-white" onClick={() => router.push('/storyboard')}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
