"use client";

import { useState } from "react"; // Import useState from React
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client
import { setLoggedInCookie } from "@/utils/authCookie"; // Import function to set logged-in cookie
import Image from "next/image"; // Import Image component from Next.js
import Link from "next/link"; // Import Link component from Next.js
import { Button } from "@/components/ui/button"; // Import Button component
import { Input } from "@/components/ui/input"; // Import Input component
import { Label } from "@/components/ui/label"; // Import Label component
import styles from './login.module.css'; // Import CSS module for styling

export default function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const router = useRouter(); // Initialize useRouter for navigation

  // Function to handle login
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password }); // Supabase login
    if (error) {
      setError(error.message); // Set error message if login fails
    } else {
      router.push('/dashboard'); // Redirect to dashboard on successful login
      setLoggedInCookie(); // Set logged-in cookie
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[910px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="button" className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-zinc-900 lg:block">
        <Image
          src="/DevLab-logo-for-black-theme.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full pl-7 w-full object-contain"
        />
      </div>
    </div>
  );
}
