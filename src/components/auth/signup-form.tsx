"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LockKeyhole, Mail, UserRound, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "./input-with-icon";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google icon</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c1.73 0 3.26.68 4.38 1.62l2.35-2.35C17.21.71 15.01 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c7.23 0 11.97-4.82 11.97-12.13 0-.79-.08-1.54-.23-2.31z" />
    </svg>
);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type UserFormValue = z.infer<typeof formSchema>;

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: string }
>(({ className, label, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const id = React.useId();
  return (
    <div className="relative pt-2">
      <Input
        id={id}
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={cn("peer h-12 pl-12 pr-12", className)}
        placeholder=" "
        {...props}
      />
      <Label
        htmlFor={id}
        className="absolute left-12 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </Label>
      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors duration-300 peer-focus:text-primary" />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";


export function SignUpForm() {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
  });

  const { formState: { errors } } = form;

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    
    if (data.email === "exists@example.com") {
        toast({
            variant: "destructive",
            title: "Sign Up Failed",
            description: "An account with this email already exists.",
        });
        form.setError("email", { type: "manual", message: "Email already in use." });
    } else {
        toast({
            title: "Account Created!",
            description: "Welcome to Vibe Trail! Please log in.",
        });
        console.log("Form data:", data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={cn(errors.name && 'animate-shake')}>
              <FormControl>
                <InputWithIcon
                  id="name"
                  icon={UserRound}
                  type="text"
                  label="Full Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className={cn(errors.email && 'animate-shake')}>
              <FormControl>
                <InputWithIcon
                  id="signup-email"
                  icon={Mail}
                  type="email"
                  label="Email Address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className={cn(errors.password && 'animate-shake')}>
              <FormControl>
                 <PasswordInput label="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className={cn(errors.confirmPassword && 'animate-shake')}>
              <FormControl>
                 <PasswordInput label="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button disabled={loading} className="w-full text-white font-semibold bg-button-gradient hover:bg-button-gradient-hover transition-all duration-300 active:scale-100 hover:scale-105" type="submit">
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
        
        <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
        </div>

        <Button variant="outline" className="w-full hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors duration-300" type="button">
            <GoogleIcon className="mr-2 h-4 w-4 fill-black dark:fill-white" />
            Google
        </Button>
      </form>
    </Form>
  );
}
