
'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { summarizeVibe, SummarizeVibeOutput } from '@/ai/flows/summarizeVibeFlow';
import { useEventStore } from '@/store/eventStore';

export default function StoryboardPage() {
  const [vibeDescription, setVibeDescription] = useState('');
  const [summary, setSummary] = useState<SummarizeVibeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setVibeSummary } = useEventStore();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeVibe({ description: vibeDescription });
      setSummary(result);
      setVibeSummary(result);
    } catch (error) {
      console.error('Error summarizing vibe:', error);
      // You could show an error toast here
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <Link href="/recommendations">
            <Button variant="ghost" size="icon">
              <ArrowLeft />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Creating Your Storyboard</h1>
          <Button disabled={!summary} className="bg-gradient-to-r from-[#6A5ACD] to-[#BDB2FF] text-white">Next</Button>
        </header>
        <div className="flex-1 flex flex-col p-8 overflow-y-auto">
          <div className="space-y-6">
            {/* AI message */}
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="relative flex-shrink-0">
                <Image src="https://placehold.co/40x40.png" alt="AI Assistant" width={40} height={40} className="rounded-full" data-ai-hint="woman smiling" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    <Sparkles className="h-3 w-3 text-primary" fill="hsl(var(--primary))"/>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <p>Thanks for the info you've shared so far! 👋 Let's bring your event vision to life with more details. Tell me about the overall vibe you're going for.</p>
              </div>
            </div>

            {/* User input */}
            <div className="flex items-start gap-4 max-w-2xl ml-auto justify-end">
              <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                <Textarea
                  placeholder="I'm planning a vibrant and classy evening wedding..."
                  value={vibeDescription}
                  onChange={(e) => setVibeDescription(e.target.value)}
                  className="bg-transparent border-none placeholder:text-primary-foreground/70 text-base"
                  onBlur={handleSummarize}
                />
              </div>
                <div className="relative flex-shrink-0">
                    <Image src="https://placehold.co/40x40.png" alt="User" width={40} height={40} className="rounded-full" data-ai-hint="woman smiling"/>
                </div>
            </div>
            
            {isLoading && <p>Generating summary...</p>}

            {/* AI Summary */}
            {summary && (
              <div className="flex items-start gap-4 max-w-2xl">
                 <div className="relative flex-shrink-0">
                    <Image src="https://placehold.co/40x40.png" alt="AI Assistant" width={40} height={40} className="rounded-full" data-ai-hint="woman smiling" />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <Sparkles className="h-3 w-3 text-primary" fill="hsl(var(--primary))"/>
                    </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-primary/20">
                  <h2 className="font-semibold mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Here's a summary of your vision:</h2>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>Color scheme:</strong> {summary.colorScheme}</li>
                    <li><strong>Theme/style:</strong> {summary.themeStyle}</li>
                    <li><strong>Flowers:</strong> {summary.flowers}</li>
                    <li><strong>Decor:</strong> {summary.decor}</li>
                    <li><strong>Lighting & ambiance:</strong> {summary.lightingAmbiance}</li>
                    <li><strong>Music:</strong> {summary.music}</li>
                    <li><strong>Overall vibe:</strong> {summary.overallVibe}</li>
                  </ul>
                  <p className="mt-4">Is this correct, or would you like to make any adjustments? If not, continue to storyboard generation.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
