
'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, MapPin, MountainSnow, Upload, User, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const recommendations = [
    {
        name: 'Riverside Studios',
        capacity: 300,
        type: 'Outdoor',
        price: 8000,
        image: 'https://placehold.co/300x200.png',
        aiHint: 'wedding venue'
    },
    {
        name: 'The Grand Hall',
        capacity: 500,
        type: 'Indoor',
        price: 12000,
        image: 'https://placehold.co/300x200.png',
        aiHint: 'grand hall'
    },
    {
        name: 'The Garden Pavilion',
        capacity: 150,
        type: 'Outdoor',
        price: 6000,
        image: 'https://placehold.co/300x200.png',
        aiHint: 'garden wedding'
    },
    {
        name: 'The Loft',
        capacity: 100,
        type: 'Indoor',
        price: 4000,
        image: 'https://placehold.co/300x200.png',
        aiHint: 'loft wedding'
    }
];

export default function VenuePage() {
    const router = useRouter();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
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
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Let's find your venue
                </h1>
                <p className="text-muted-foreground mb-8">
                    Select one of the 2 options below to get started
                </p>
                
                <Tabs defaultValue="address" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto bg-card border rounded-lg">
                        <TabsTrigger value="address">Find by address</TabsTrigger>
                        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    </TabsList>
                    <TabsContent value="address">
                        <Card className="mt-8 border-none shadow-none">
                            <CardContent className="p-0">
                                <div className="space-y-4 max-w-2xl mx-auto">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                            <Input
                                                type="text"
                                                placeholder="New York"
                                                className="pl-10 py-6"
                                            />
                                        </div>
                                        <Select>
                                            <SelectTrigger className="py-6">
                                                <SelectValue placeholder="Manhattan - Chelsea" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="manhattan-chelsea">Manhattan - Chelsea</SelectItem>
                                                <SelectItem value="brooklyn">Brooklyn</SelectItem>
                                                <SelectItem value="queens">Queens</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Enter venue location"
                                            className="pl-10 py-6"
                                        />
                                    </div>
                                    <div className="relative flex items-center justify-center text-muted-foreground">
                                        <div className="flex-grow border-t border-dashed"></div>
                                        <span className="mx-4">or</span>
                                        <div className="flex-grow border-t border-dashed"></div>
                                    </div>
                                    <div className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center">
                                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">Upload upto 3 images</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="recommendations">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                            {recommendations.map((venue, index) => (
                                <Card key={index} className="overflow-hidden border-none shadow-none bg-transparent">
                                    <CardContent className="p-0">
                                        <Image src={venue.image} alt={venue.name} width={300} height={200} className="w-full h-auto object-cover rounded-lg" data-ai-hint={venue.aiHint} />
                                        <div className="p-2 text-left">
                                            <h3 className="font-semibold text-md">{venue.name}</h3>
                                            <div className="flex items-center text-sm text-muted-foreground gap-4 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>upto {venue.capacity}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MountainSnow className="h-4 w-4" />
                                                    <span>{venue.type}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>from ${venue.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-center gap-4 mt-12">
                    <Link href="/guests">
                        <Button variant="outline" size="lg" className="px-12 py-6 text-lg">
                            Back
                        </Button>
                    </Link>
                    <Button size="lg" className="px-12 py-6 text-lg bg-gradient-to-r from-[#6A5ACD] to-[#BDB2FF] text-white" onClick={() => router.push('/vibe')}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
