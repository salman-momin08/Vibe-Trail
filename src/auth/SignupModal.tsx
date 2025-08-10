
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Facebook, Eye, EyeOff } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { Checkbox } from '../ui/checkbox';
import { useModalStore } from '@/store/modalStore';

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M21.35 11.1h-9.35v2.8h5.24c-.22 1.48-1.04 2.76-2.4 3.68v2.36h3.04c1.78-1.64 2.82-4.12 2.82-6.84 0-.76-.08-1.5-.21-2.2z"/>
        <path fill="#34A853" d="M12 22c2.62 0 4.88-1.12 6.48-2.92l-3.04-2.36c-.88.6-2 1.02-3.44 1.02-2.6 0-4.8-1.76-5.58-4.14H3.34v2.44C4.94 19.86 8.2 22 12 22z"/>
        <path fill="#FBBC05" d="M6.42 14.16c-.22-.64-.34-1.32-.34-2.04s.12-1.4.34-2.04V7.64H3.34c-.66 1.3-1.04 2.74-1.04 4.28s.38 2.98 1.04 4.28l3.08-2.44z"/>
        <path fill="#EA4335" d="M12 6.26c1.42 0 2.7.5 3.72 1.54l2.6-2.6C16.88 3.12 14.62 2 12 2 8.2 2 4.94 4.14 3.34 7.64l3.08 2.44c.78-2.38 2.98-4.14 5.58-4.14z"/>
    </svg>
);


export function SignupModal() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { modal, setModal } = useModalStore();

    const open = modal === 'signup';

    useEffect(() => {
        if (!open) {
          setFullName('');
          setEmail('');
          setPassword('');
          setShowPassword(false);
          setTermsAccepted(false);
          setError(null);
          setSuccess(null);
        }
      }, [open]);

    const validatePassword = (password: string) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("be at least 8 characters long");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("contain at least one capital letter");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("contain at least one number");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("contain at least one special character");
        }

        if (errors.length > 0) {
            return "Password must " + errors.join(', ') + ".";
        }
        return null;
    };


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!termsAccepted) {
            setError("You must accept the terms and conditions.");
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: fullName
            });
            setSuccess("Account created successfully!");
            setTimeout(() => setModal(null), 1000);
        } catch (err: any) {
            setError(err.message);
        }
    };
    
    const handleSocialLogin = async (provider: GoogleAuthProvider | GithubAuthProvider | FacebookAuthProvider) => {
        try {
            await signInWithPopup(auth, provider);
            setSuccess('Login successful!');
            setTimeout(() => setModal(null), 1000);
        } catch (err: any) {
            setError(err.message);
        }
    }


  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && setModal(null)}>
      <DialogContent className="p-0 border-0 sm:max-w-md bg-transparent shadow-none">
        <DialogTitle className="sr-only">Create Account</DialogTitle>
            <Card className="w-full max-w-md rounded-2xl shadow-lg border-0 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold">Create Account</h1>
                        <div className="bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.0042 9.248C15.1769 9.248 15.2959 9.28467 15.3682 9.358C15.4479 9.43133 15.4878 9.52667 15.4878 9.644C15.4878 9.83467 15.4291 10.0033 15.3128 10.15C15.2038 10.2967 14.9962 10.3733 14.6882 10.381C14.1015 10.3957 13.5802 10.3517 13.1242 10.249C12.6028 11.3417 12.0162 12.251 11.2648 12.977C10.5135 13.6957 9.7735 14.055 9.04483 14.055C8.30483 14.055 7.7475 13.611 7.37283 12.723C7.0055 11.835 6.82183 10.6377 6.82183 9.127C6.82183 7.83633 6.91317 6.67767 7.09617 5.651C7.15883 5.26967 7.25417 5.013 7.38217 4.881C7.5175 4.74167 7.7335 4.672 8.02883 4.672C8.51417 4.672 8.75683 4.881 8.75683 5.299C8.75683 5.343 8.75017 5.42367 8.73683 5.541C8.5175 6.861 8.40783 8.05733 8.40783 9.127C8.40783 10.249 8.49917 11.1033 8.68217 11.69C8.87283 12.2693 9.1555 12.559 9.53017 12.559C9.9115 12.559 10.3222 12.295 10.7622 11.771C11.2022 11.247 11.6162 10.5757 12.0048 9.776C11.5562 9.49733 11.2222 9.138 11.0028 8.698C10.7835 8.25067 10.6738 7.73633 10.6738 7.157C10.6738 6.57767 10.7622 6.08933 10.9382 5.695C11.1142 5.29333 11.3782 4.99467 11.7302 4.799C12.0822 4.596 12.4635 4.49467 12.8742 4.496C13.3375 4.496 13.7048 4.66467 13.9768 5.004C14.2562 5.34333 14.3955 5.80267 14.3955 6.388C14.3955 7.23133 14.2155 8.15133 13.8522 9.149C14.2335 9.21567 14.6695 9.248 15.0042 9.248ZM11.7608 7.081C11.7608 7.79967 11.9942 8.33133 12.4622 8.675C12.7415 7.85467 12.8815 6.97767 12.8815 6.641C12.8815 6.333 12.8408 6.11367 12.7588 5.972C12.6768 5.82333 12.5642 5.75 12.4208 5.75C12.2135 5.75 12.0468 5.86733 11.9208 6.102C11.7948 6.32933 11.7608 6.65567 11.7608 7.081Z" fill="white"/>
                            </svg>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSignup}>
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Full name</Label>
                            <Input id="fullname" type="text" placeholder="Vibetrail User" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="username@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                             <div className="relative">
                                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the Terms & Conditions
                            </label>
                        </div>
                        <Button type="submit" className="w-full h-12 text-lg bg-gradient-to-r from-[#6A5ACD] to-[#BDB2FF] text-white">
                            Sign Up
                        </Button>
                    </form>
                    
                    {error && <p className="text-destructive text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-2">{success}</p>}


                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" onClick={() => handleSocialLogin(new GoogleAuthProvider())}><GoogleIcon /></Button>
                        <Button variant="outline" onClick={() => handleSocialLogin(new GithubAuthProvider())}><Github className="h-5 w-5" /></Button>
                        <Button variant="outline" onClick={() => handleSocialLogin(new FacebookAuthProvider())}><Facebook className="h-5 w-5" /></Button>
                    </div>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                         <span onClick={() => setModal('login')} className="font-semibold text-primary hover:underline cursor-pointer">
                            Sign in
                         </span>
                    </p>
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                        Terms & Conditions apply
                    </p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-primary"></div>
            </Card>
      </DialogContent>
    </Dialog>
  );
}

    