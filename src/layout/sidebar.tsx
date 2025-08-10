
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, LayoutGrid, MessageSquare, Search, Video } from 'lucide-react';
import Link from 'next/link';
import BrandingLogo from './BrandingLogo';
import UserProfile from './UserProfile';

export function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 flex-col bg-white border-r p-4 hidden md:flex">
      <BrandingLogo />
      <Separator />
      <nav className="flex flex-col gap-2 mt-4">
        <Button variant="ghost" className="justify-start gap-2">
          <MessageSquare className="h-5 w-5" />
          New Chat
        </Button>
        <Button variant="ghost" className="justify-start gap-2">
          <Search className="h-5 w-5" />
          Search
        </Button>
        <Button variant="ghost" className="justify-start gap-2">
          <LayoutGrid className="h-5 w-5" />
          Moodboard
        </Button>
        <Button variant="ghost" className="justify-start gap-2">
          <Video className="h-5 w-5" />
          Video Library
        </Button>
      </nav>
      <Separator className="my-4" />
      <div className="flex-grow">
        <h2 className="text-sm text-muted-foreground font-semibold px-4 mb-2">Chats</h2>
        <Button variant="secondary" className="w-full justify-between">
          New Chat
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <Separator />
      <div className="mt-auto">
        <UserProfile />
      </div>
    </aside>
  );
}
