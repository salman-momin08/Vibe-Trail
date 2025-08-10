
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useModalStore } from '@/store/modalStore';

export function ForgotPasswordModal() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { modal, setModal } = useModalStore();

  const open = modal === 'forgotPassword';

  useEffect(() => {
    if (!open) {
      setEmail('');
      setError(null);
      setSuccess(null);
    }
  }, [open]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Check your inbox.');
    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && setModal(null)}>
      <DialogContent className="p-0 border-0 sm:max-w-md bg-transparent shadow-none">
        <DialogTitle className="sr-only">Forgot Password</DialogTitle>
        <Card className="w-full max-w-md rounded-2xl shadow-lg border-0 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold">Reset Password</h1>
                <div className="bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0042 9.248C15.1769 9.248 15.2959 9.28467 15.3682 9.358C15.4479 9.43133 15.4878 9.52667 15.4878 9.644C15.4878 9.83467 15.4291 10.0033 15.3128 10.15C15.2038 10.2967 14.9962 10.3733 14.6882 10.381C14.1015 10.3957 13.5802 10.3517 13.1242 10.249C12.6028 11.3417 12.0162 12.251 11.2648 12.977C10.5135 13.6957 9.7735 14.055 9.04483 14.055C8.30483 14.055 7.7475 13.611 7.37283 12.723C7.0055 11.835 6.82183 10.6377 6.82183 9.127C6.82183 7.83633 6.91317 6.67767 7.09617 5.651C7.15883 5.26967 7.25417 5.013 7.38217 4.881C7.5175 4.74167 7.7335 4.672 8.02883 4.672C8.51417 4.672 8.75683 4.881 8.75683 5.299C8.75683 5.343 8.75017 5.42367 8.73683 5.541C8.5175 6.861 8.40783 8.05733 8.40783 9.127C8.40783 10.249 8.49917 11.1033 8.68217 11.69C8.87283 12.2693 9.1555 12.559 9.53017 12.559C9.9115 12.559 10.3222 12.295 10.7622 11.771C11.2022 11.247 11.6162 10.5757 12.0048 9.776C11.5562 9.49733 11.2222 9.138 11.0028 8.698C10.7835 8.25067 10.6738 7.73633 10.6738 7.157C10.6738 6.57767 10.7622 6.08933 10.9382 5.695C11.1142 5.29333 11.3782 4.99467 11.7302 4.799C12.0822 4.596 12.4635 4.49467 12.8742 4.496C13.3375 4.496 13.7048 4.66467 13.9768 5.004C14.2562 5.34333 14.3955 5.80267 14.3955 6.388C14.3955 7.23133 14.2155 8.15133 13.8522 9.149C14.2335 9.21567 14.6695 9.248 15.0042 9.248ZM11.7608 7.081C11.7608 7.79967 11.9942 8.33133 12.4622 8.675C12.7415 7.85467 12.8815 6.97767 12.8815 6.641C12.8815 6.333 12.8408 6.11367 12.7588 5.972C12.6768 5.82333 12.5642 5.75 12.4208 5.75C12.2135 5.75 12.0468 5.86733 11.9208 6.102C11.7948 6.32933 11.7608 6.65567 11.7608 7.081Z" fill="white"/>
                    </svg>
                </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <form className="space-y-4" onSubmit={handlePasswordReset}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="username@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-gradient-to-r from-[#6A5ACD] to-[#BDB2FF] text-white">
                Send Reset Link
              </Button>
            </form>

            {error && <p className="text-destructive text-sm mt-4 text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Remember your password?{' '}
              <span onClick={() => setModal('login')} className="font-semibold text-primary hover:underline cursor-pointer">
                Sign in
              </span>
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-primary"></div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
