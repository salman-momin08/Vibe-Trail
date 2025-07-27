"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "./input-with-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google icon</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c1.73 0 3.26.68 4.38 1.62l2.35-2.35C17.21.71 15.01 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c7.23 0 11.97-4.82 11.97-12.13 0-.79-.08-1.54-.23-2.31z" />
    </svg>
);


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type UserFormValue = z.infer<typeof formSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState("");

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { watch, formState: { errors } } = form;
  const email = watch("email");

  React.useEffect(() => {
    const emailValue = form.getValues("email");
    if (form.getFieldState("email").isTouched && !form.getFieldState("email").error) {
       if (emailValue === "sandra.smith@example.com") {
        setAvatarUrl(`https://i.pravatar.cc/150?u=${emailValue}`);
      } else {
        setAvatarUrl("");
      }
    } else {
       setAvatarUrl("");
    }
  }, [email, form]);


  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    
    if (data.email !== "sandra.smith@example.com" || data.password !== "password123") {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Incorrect email or password. Please try again.",
        });
        if (data.email !== "sandra.smith@example.com") {
          form.setError("email", { type: "manual", message: " " });
        }
        if (data.password !== "password123") {
            form.setError("password", { type: "manual", message: "Incorrect password" });
        }
    } else {
        toast({
            title: "Login Successful!",
            description: "Welcome back!",
        });
        console.log("Form data:", data);
    }
  };

  return (
    <Form {...form}>
       <div className="flex flex-col items-center space-y-6">
        <div className="h-24 w-24 transition-all duration-300">
            <Avatar className={cn(
                "h-24 w-24 shadow-lg ring-2 ring-white dark:ring-neutral-800 transition-all duration-300",
                avatarUrl ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}>
                <AvatarImage src={avatarUrl} alt="User Avatar" data-ai-hint="female avatar" className="transition-opacity duration-500" />
                <AvatarFallback>
                  {email ? email.substring(0, 2).toUpperCase() : 'SS'}
                </AvatarFallback>
            </Avatar>
        </div>


        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={cn(errors.email && 'animate-shake')}>
                <FormControl>
                  <InputWithIcon
                    id="email"
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
                  <InputWithIcon
                    id="password"
                    icon={LockKeyhole}
                    type="password"
                    label="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button disabled={loading} className="w-full bg-button-gradient font-semibold text-white transition-all duration-300 hover:bg-button-gradient-hover hover:scale-105 active:scale-100" type="submit">
            {loading ? "Logging In..." : "Login"}
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

          <div className="flex justify-between text-xs text-muted-foreground">
            <a href="#" className="font-medium hover:text-primary underline-offset-4 hover:underline">
                Forgot Password?
            </a>
            <a href="#" className="font-medium hover:text-primary underline-offset-4 hover:underline">
                Get help
            </a>
          </div>
        </form>
      </div>
    </Form>
  );
}
