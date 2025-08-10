
'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/LoginModal";
import { SignupModal } from "@/components/auth/SignupModal";
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useModalStore } from '@/store/modalStore';


export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const { setModal } = useModalStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
    };

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'G';
        const names = name.split(' ');
        if (names.length > 1) {
            return names[0][0] + names[names.length - 1][0];
        }
        return name[0];
    };

    return (
        <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
                <Avatar>
                    {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
                    <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{user ? user.displayName : 'Guest'}</p>
                    <p className="text-sm text-primary">Title</p>
                </div>
            </div>
            {user ? (
                <Button variant="outline" className="w-full" onClick={handleLogout}>Logout</Button>
            ) : (
                <div className="flex gap-2">
                    <Button onClick={() => setModal('login')} className="w-full bg-gray-800 text-white hover:bg-gray-700">Login</Button>
                    <Button onClick={() => setModal('signup')} variant="outline" className="w-full">Signup</Button>
                </div>
            )}
            <LoginModal />
            <SignupModal />
            <ForgotPasswordModal />
        </div>
    );
}

    